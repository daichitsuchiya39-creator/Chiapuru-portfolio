import Link from 'next/link';

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
  appCount: number;
}

export default function CategoryCard({ slug, name, description, icon, appCount }: CategoryCardProps) {
  return (
    <Link href={`/apps/${slug}`} className="card group block">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-3xl dark:bg-primary-900/30">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary-500 dark:text-white dark:group-hover:text-primary-400">
        {name}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {appCount} {appCount === 1 ? 'app' : 'apps'}
        </span>
        <span className="inline-flex items-center text-primary-500 transition-colors group-hover:text-primary-600 dark:text-primary-400 dark:group-hover:text-primary-300">
          View all
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
