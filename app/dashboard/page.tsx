import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getMembershipByEmail } from '@/lib/membership';
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

  const membership = await getMembershipByEmail(session.user.email);

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
            メンバー限定のブログ記事を読む
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
            メンバー限定のツール・テンプレートを利用する
          </p>
        </Link>
      </div>
    </div>
  );
}
