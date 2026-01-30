import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="container-custom text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary-500">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          お探しのページは見つかりませんでした。
        </p>
        <Link href="/" className="btn-primary">
          トップページに戻る
        </Link>
      </div>
    </section>
  );
}
