import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/member-only-blog');

export interface MemberPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content?: string;
  contentHtml?: string;
}

export async function getAllMemberPosts(): Promise<MemberPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
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
        content,
      };
    });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function findPostFile(slug: string): string | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  for (const fileName of fileNames) {
    if (fileName.endsWith('.md')) {
      const fileSlug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      if (fileSlug === slug) {
        return path.join(postsDirectory, fileName);
      }
    }
  }
  return null;
}

export async function getPostBySlug(slug: string): Promise<MemberPost | null> {
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
    excerpt: data.excerpt || '',
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
