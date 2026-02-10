import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  order?: number;
  content?: string;
  contentHtml?: string;
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // ファイル名から日付プレフィックス（YYYY-MM-DD-）を除去してslugを生成
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        tags: data.tags || [],
        order: data.order ?? 0,
        content,
      };
    });

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateA !== dateB) return dateB - dateA;
    return (b.order ?? 0) - (a.order ?? 0);
  });
}

// slugに一致するファイルを探す（日付プレフィックス付き/なし両方対応）
function findPostFile(slug: string): string | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }
  const fileNames = fs.readdirSync(postsDirectory);
  // 日付プレフィックス付きファイルを優先して検索
  const matchedFile = fileNames.find((fileName) => {
    const fileSlug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return fileSlug === slug;
  });
  return matchedFile ? path.join(postsDirectory, matchedFile) : null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = findPostFile(slug);

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    tags: data.tags || [],
    content,
    contentHtml,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''));
}
