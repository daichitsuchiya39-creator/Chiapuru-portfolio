'use client';

import { useEffect, useState } from 'react';

interface TierInfo {
  name: string;
  price: number;
  remaining: number;
  maxDownloads: number;
}

interface NextTierInfo {
  name: string;
  price: number;
  startsAt: number;
}

interface DownloadStats {
  total: number;
  currentTier: TierInfo;
  nextTier: NextTierInfo | null;
}

export default function DownloadCounter() {
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/downloads/excel-toolbox')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch download stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <div className="animate-pulse">
          <div className="mb-2 h-4 w-3/4 rounded bg-blue-200"></div>
          <div className="h-8 w-1/2 rounded bg-blue-200"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const { currentTier, nextTier, total } = stats;
  const isFree = currentTier.price === 0;
  const isEnterprise = currentTier.name === 'basic';

  // Progress within current tier
  const tierStart = currentTier.maxDownloads - currentTier.remaining - total;
  const tierProgress = isEnterprise
    ? 100
    : ((total - tierStart) / (currentTier.maxDownloads - tierStart)) * 100;

  // Tier-specific styling
  const tierStyles = {
    free: {
      gradient: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      badge: 'bg-green-100 text-green-700',
      icon: '🎉',
      title: 'Free Download Available',
      progressBar: 'from-green-500 to-emerald-600',
    },
    early51: {
      gradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      badge: 'bg-blue-100 text-blue-700',
      icon: '💎',
      title: 'Early Bird (51-100)',
      progressBar: 'from-blue-500 to-indigo-600',
    },
    early101: {
      gradient: 'from-purple-50 to-pink-50',
      border: 'border-purple-200',
      badge: 'bg-purple-100 text-purple-700',
      icon: '🚀',
      title: 'Early Bird (101-200)',
      progressBar: 'from-purple-500 to-pink-600',
    },
    basic: {
      gradient: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
      icon: '🏆',
      title: 'Basic',
      progressBar: 'from-amber-500 to-yellow-600',
    },
  };

  const style = tierStyles[currentTier.name as keyof typeof tierStyles] || tierStyles.early51;

  return (
    <div className={`rounded-lg border p-6 shadow-sm bg-gradient-to-r ${style.gradient} ${style.border}`}>
      {/* Header with Tier Badge */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{style.icon}</span>
          <h3 className="text-lg font-bold text-gray-900">{style.title}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
            {currentTier.name.toUpperCase()}
          </span>
        </div>
        <span className="text-2xl font-bold text-gray-900">
          {isFree ? 'FREE' : `$${currentTier.price}`}
        </span>
      </div>

      {/* Remaining Downloads */}
      <p className="mb-4 text-sm text-gray-600">
        {isEnterprise ? (
          <>
            <span className="font-semibold">{total.toLocaleString()}</span> total downloads!
            Unlimited access.
          </>
        ) : (
          <>
            <span className="font-semibold">{currentTier.remaining}</span> downloads remaining at
            this price
          </>
        )}
      </p>

      {/* Progress Bar */}
      {!isEnterprise && (
        <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-3 rounded-full bg-gradient-to-r transition-all duration-500 ease-out ${style.progressBar}`}
            style={{ width: `${tierProgress}%` }}
          ></div>
        </div>
      )}

      {/* Next Tier Warning */}
      {nextTier && currentTier.remaining <= 10 && currentTier.remaining > 0 && (
        <p className="text-xs font-medium text-orange-600">
          ⚡️ Only {currentTier.remaining} downloads left at ${currentTier.price}! Next tier: $
          {nextTier.price}
        </p>
      )}

      {/* Next Tier Info */}
      {nextTier && currentTier.remaining > 10 && (
        <p className="text-xs text-gray-500">
          After {currentTier.maxDownloads} downloads: ${nextTier.price} ({nextTier.name})
        </p>
      )}

      {/* Enterprise Message */}
      {isEnterprise && (
        <p className="text-xs text-gray-500">
          🎊 Thank you for your support! {total.toLocaleString()} total downloads and counting!
        </p>
      )}
    </div>
  );
}
