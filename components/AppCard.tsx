import Link from 'next/link';
import Image from 'next/image';

interface AppCardProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  comingSoon?: boolean;
  isFavorited?: boolean;
  memberOnly?: boolean;
}

export default function AppCard({ title, description, slug, image, comingSoon, isFavorited, memberOnly }: AppCardProps) {
  if (comingSoon) {
    return (
      <div className="card opacity-70">
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{description}</p>
        <span className="inline-block rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <Link href={memberOnly ? `/member-only-apps/${slug}` : `/apps/${slug}`} className="card group relative block">
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
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
      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">📊</span>
          </div>
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary-500 dark:text-white dark:group-hover:text-primary-400">
        {title}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{description}</p>
      <span className="inline-flex items-center text-primary-500 transition-colors group-hover:text-primary-600 dark:text-primary-400 dark:group-hover:text-primary-300">
        詳細を見る
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
