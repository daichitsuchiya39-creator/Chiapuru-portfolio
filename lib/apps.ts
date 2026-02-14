import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const appsDirectory = path.join(process.cwd(), 'content/apps');
const HIDDEN_CATEGORIES = new Set(['crypto']);

export interface DownloadLink {
  label: string;
  path: string;
}

export interface AppData {
  slug: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  features: string[];
  howToUse?: string[];
  externalLink?: string;
  screenshots?: string[];
  downloadLinks?: DownloadLink[];
  disclaimer?: string;
  contentHtml?: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  icon: string;
  appCount: number;
}

const CATEGORY_META: Record<string, { name: string; description: string; icon: string }> = {
  excel: {
    name: 'Spreadsheet Tools',
    description: 'スプレッドシートの分割・統合・変換など、表計算作業を効率化するツール群',
    icon: '📊',
  },
};

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
        category: data.category || '',
        image: data.image || '',
        features: data.features || [],
        howToUse: data.howToUse || [],
        externalLink: data.externalLink || '',
        screenshots: data.screenshots || [],
        downloadLinks: data.downloadLinks || [],
        disclaimer: data.disclaimer || '',
      };
    })
    .filter((app) => !HIDDEN_CATEGORIES.has(app.category || ''));

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
    category: data.category || '',
    image: data.image || '',
    features: data.features || [],
    howToUse: data.howToUse || [],
    externalLink: data.externalLink || '',
    screenshots: data.screenshots || [],
    downloadLinks: data.downloadLinks || [],
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

export async function getAppsByCategory(category: string): Promise<AppData[]> {
  const allApps = await getAllApps();
  return allApps.filter((app) => app.category === category);
}

export async function getAllCategories(): Promise<CategoryInfo[]> {
  const allApps = await getAllApps();
  const categoryCounts = new Map<string, number>();

  for (const app of allApps) {
    if (app.category && !HIDDEN_CATEGORIES.has(app.category)) {
      categoryCounts.set(app.category, (categoryCounts.get(app.category) || 0) + 1);
    }
  }

  return Array.from(categoryCounts.entries()).map(([slug, count]) => ({
    slug,
    name: CATEGORY_META[slug]?.name || slug,
    description: CATEGORY_META[slug]?.description || '',
    icon: CATEGORY_META[slug]?.icon || '📦',
    appCount: count,
  }));
}
