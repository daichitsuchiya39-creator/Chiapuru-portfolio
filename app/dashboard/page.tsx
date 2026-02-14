import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getMembershipByEmail } from '@/lib/membership';
import { getFavoritesByEmail } from '@/lib/favorites';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="container-custom py-24">
        <h1 className="text-2xl font-bold">Not signed in</h1>
        <p>Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const [membership, favorites] = await Promise.all([
    getMembershipByEmail(session.user.email),
    getFavoritesByEmail(session.user.email),
  ]);

  const contentTypeLabels: Record<string, string> = {
    blog: 'Blog',
    app: 'App',
    'member-only-blog': 'Member Blog',
    'member-only-app': 'Member Tool',
  };

  const contentTypeLinks: Record<string, string> = {
    blog: '/blog',
    app: '/apps',
    'member-only-blog': '/member-only-blog',
    'member-only-app': '/member-only-apps',
  };

  return (
    <div className="container-custom py-24">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Signed in as: {session.user.email}
      </p>

      {/* Membership Info */}
      <div className="mb-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h2 className="mb-4 text-lg font-semibold">Membership</h2>
        {membership ? (
          <div className="space-y-2">
            <p>
              <span className="font-medium">Tier:</span>{' '}
              <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                {membership.tier ?? 'free'}
              </span>
            </p>
            <p>
              <span className="font-medium">Expires:</span>{' '}
              {membership.expires_at ?? 'No expiration'}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No membership record found.</p>
        )}
      </div>

      {/* Favorites */}
      <div className="mb-8 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h2 className="mb-4 text-lg font-semibold">Favorites</h2>
        {favorites.length > 0 ? (
          <ul className="space-y-3">
            {favorites.map((fav) => (
              <li key={fav.id}>
                <Link
                  href={`${contentTypeLinks[fav.content_type]}/${fav.content_slug}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {fav.content_slug}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    {contentTypeLabels[fav.content_type] ?? fav.content_type}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No favorites yet. Tap the heart icon on any blog post or app to add it here.
          </p>
        )}
      </div>

      {/* Member Content Links */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/member-only-blog"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-400"
        >
          <h3 className="mb-2 text-lg font-semibold group-hover:text-primary-500">
            Member Blog
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Read member-exclusive blog posts
          </p>
        </Link>
        <Link
          href="/member-only-apps"
          className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-400"
        >
          <h3 className="mb-2 text-lg font-semibold group-hover:text-primary-500">
            Member Tools
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Access member-exclusive tools and templates
          </p>
        </Link>
      </div>
    </div>
  );
}
