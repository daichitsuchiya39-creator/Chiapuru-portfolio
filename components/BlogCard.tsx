import Link from 'next/link';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
}

export default function BlogCard({ title, date, excerpt, slug, tags }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="card group block">
      <div className="mb-3 flex items-center gap-3">
        <time className="text-sm text-gray-500 dark:text-gray-400">{date}</time>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary-500 dark:text-white dark:group-hover:text-primary-400">
        {title}
      </h3>
      <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">{excerpt}</p>
      <span className="inline-flex items-center text-primary-500 transition-colors group-hover:text-primary-600 dark:text-primary-400 dark:group-hover:text-primary-300">
        続きを読む
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
