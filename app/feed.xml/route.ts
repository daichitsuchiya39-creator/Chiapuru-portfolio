import { getAllPosts } from '@/lib/blog';
import { getAllNews } from '@/lib/news';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chiapuru.com';
  const [posts, news] = await Promise.all([getAllPosts(), getAllNews()]);

  const blogItems = posts.map((post) => ({
    ...post,
    path: `/blog/${post.slug}`,
  }));
  const newsItems = news.map((post) => ({
    ...post,
    path: `/news/${post.slug}`,
  }));

  const allItems = [...blogItems, ...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rssItems = allItems
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}${post.path}</link>
      <guid isPermaLink="true">${baseUrl}${post.path}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>
  `
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chiapuru Blog</title>
    <link>${baseUrl}</link>
    <description>Behind the scenes of building indie software. Dev logs, tools, and lessons learned.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
