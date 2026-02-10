import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/blog';
import { getAllAppSlugs } from '@/lib/apps';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chiapuru.com';

  const postSlugs = await getAllPostSlugs();
  const appSlugs = await getAllAppSlugs();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apps/excel`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const blogPages = postSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const appPages = appSlugs.map((slug) => ({
    url: `${baseUrl}/apps/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Add excel-splitter if not already in appSlugs
  if (!appSlugs.includes('excel-splitter')) {
    appPages.push({
      url: `${baseUrl}/apps/excel-splitter`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    });
  }

  return [...staticPages, ...blogPages, ...appPages];
}
