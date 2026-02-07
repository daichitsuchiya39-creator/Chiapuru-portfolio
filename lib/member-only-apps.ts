import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const appsDirectory = path.join(process.cwd(), 'content/member-only-apps');

export interface MemberApp {
  slug: string;
  title: string;
  description: string;
  features: string[];
  howToUse: string[];
  content?: string;
  contentHtml?: string;
}

export async function getAllMemberApps(): Promise<MemberApp[]> {
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
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        features: data.features || [],
        howToUse: data.howToUse || [],
        content,
      };
    });

  return allApps.sort((a, b) => a.title.localeCompare(b.title));
}

function findAppFile(slug: string): string | null {
  if (!fs.existsSync(appsDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(appsDirectory);
  for (const fileName of fileNames) {
    if (fileName.endsWith('.md')) {
      const fileSlug = fileName.replace(/\.md$/, '');
      if (fileSlug === slug) {
        return path.join(appsDirectory, fileName);
      }
    }
  }
  return null;
}

export async function getAppBySlug(slug: string): Promise<MemberApp | null> {
  const fullPath = findAppFile(slug);
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
    description: data.description || '',
    features: data.features || [],
    howToUse: data.howToUse || [],
    content,
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
