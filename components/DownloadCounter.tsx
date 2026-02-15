'use client';

import { useEffect, useState } from 'react';

interface DownloadStats {
  total: number;
  remaining: number;
  isFree: boolean;
  maxFree: number;
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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-blue-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const percentage = ((stats.maxFree - stats.remaining) / stats.maxFree) * 100;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 shadow-sm">
      {stats.isFree ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">🎉 Free Download Available</h3>
            <span className="text-2xl font-bold text-blue-600">{stats.remaining}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Free downloads remaining (out of {stats.maxFree})
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            ⚡️ Hurry! Download for free before we reach {stats.maxFree} downloads
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">💎 Now Available</h3>
            <span className="text-2xl font-bold text-indigo-600">$9.99</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Free period ended at {stats.maxFree} downloads
          </p>
          <p className="text-xs text-gray-500">
            🎊 {stats.total.toLocaleString()} total downloads! Thank you for your support!
          </p>
        </>
      )}
    </div>
  );
}
