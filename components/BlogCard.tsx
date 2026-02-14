import Link from 'next/link';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  isFavorited?: boolean;
  memberOnly?: boolean;
  basePath?: string;
}

export default function BlogCard({ title, date, excerpt, slug, tags, isFavorited, memberOnly, basePath }: BlogCardProps) {
  const href = memberOnly ? `/member-only-blog/${slug}` : `${basePath || '/blog'}/${slug}`;
  return (
    <Link href={href} className="card group relative block">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {memberOnly && (
          <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-semibold text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
            Members
          </span>
        )}
        {isFavorited && (
          <span className="text-red-500" aria-label="Favorited">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </span>
        )}
      </div>
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
        Read more
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
