import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const appsDirectory = path.join(process.cwd(), 'content/apps');

export interface AppData {
  slug: string;
  title: string;
  description: string;
  image?: string;
  features: string[];
  howToUse?: string[];
  externalLink?: string;
  screenshots?: string[];
  disclaimer?: string;
  contentHtml?: string;
}

export async function getAllApps(): Promise<AppData[]> {
  if (!fs.existsSync(appsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(appsDirectory);
  const allApps = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(appsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        features: data.features || [],
        howToUse: data.howToUse || [],
        externalLink: data.externalLink || '',
        screenshots: data.screenshots || [],
        disclaimer: data.disclaimer || '',
      };
    });

  return allApps;
}

export async function getAppBySlug(slug: string): Promise<AppData | null> {
  const fullPath = path.join(appsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    image: data.image || '',
    features: data.features || [],
    howToUse: data.howToUse || [],
    externalLink: data.externalLink || '',
    screenshots: data.screenshots || [],
    disclaimer: data.disclaimer || '',
    contentHtml,
  };
}

export async function getAllAppSlugs(): Promise<string[]> {
  if (!fs.existsSync(appsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(appsDirectory);
  return fileNames.filter((fileName) => fileName.endsWith('.md')).map((fileName) => fileName.replace(/\.md$/, ''));
}
