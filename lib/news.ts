import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const newsDirectory = path.join(process.cwd(), 'content/news');

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  order?: number;
  content?: string;
  contentHtml?: string;
}

export async function getAllNews(): Promise<NewsPost[]> {
  if (!fs.existsSync(newsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(newsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(newsDirectory, fileName);
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

function findNewsFile(slug: string): string | null {
  if (!fs.existsSync(newsDirectory)) {
    return null;
  }
  const fileNames = fs.readdirSync(newsDirectory);
  const matchedFile = fileNames.find((fileName) => {
    const fileSlug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    return fileSlug === slug;
  });
  return matchedFile ? path.join(newsDirectory, matchedFile) : null;
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const fullPath = findNewsFile(slug);

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkGfm).use(html).process(content);
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

export async function getAllNewsSlugs(): Promise<string[]> {
  if (!fs.existsSync(newsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(newsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''));
}
