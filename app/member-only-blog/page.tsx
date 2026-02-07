import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFavoritesByEmail } from '@/lib/favorites';
import { getAllMemberPosts } from '@/lib/member-only-blog';
import Link from 'next/link';

export const metadata = {
  title: 'Member Blog | Chiapuru',
  description: 'Member-only blog posts and insights',
};

export default async function MemberBlogPage() {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    // Redirect to sign-in
    return (
      <div className="container-custom py-24">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>Please sign in to view member-only content.</p>
        <Link href="/auth/signin" className="text-primary-500 hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  const [posts, favorites] = await Promise.all([
    getAllMemberPosts(),
    getFavoritesByEmail(session.user.email),
  ]);
  const favoritedSlugs = new Set(
    favorites.filter((f) => f.content_type === 'member-only-blog').map((f) => f.content_slug)
  );

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold">Member Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Exclusive content for members</p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container-custom">
          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No member blog posts yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/member-only-blog/${post.slug}`}
                  className="group relative rounded-lg border border-gray-200 p-6 transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-400"
                >
                  {favoritedSlugs.has(post.slug) && (
                    <span className="absolute right-4 top-4 text-red-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                  )}
                  <h2 className="mb-2 text-xl font-semibold group-hover:text-primary-500">{post.title}</h2>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
                  <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
