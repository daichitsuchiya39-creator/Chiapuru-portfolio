import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white py-20 dark:from-gray-900 dark:to-gray-800 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-900/20" />
        <div className="absolute -bottom-1/4 -left-1/4 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />
      </div>

      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          {subtitle && (
            <p className="mb-4 text-lg text-primary-600 dark:text-primary-400">{subtitle}</p>
          )}
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 md:text-xl">{description}</p>

          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {ctaText && ctaLink && (
                <Link href={ctaLink} className="btn-primary">
                  {ctaText}
                </Link>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Link href={secondaryCtaLink} className="btn-secondary">
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
