'use client';

import { useState } from 'react';

interface DownloadButtonProps {
  href: string;
  platform: 'windows' | 'mac';
  version: string;
  fileName: string;
}

export default function DownloadButton({ href, platform, version, fileName }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDownloading) {
      e.preventDefault();
      return;
    }

    setIsDownloading(true);

    try {
      // カウンターをインクリメント
      await fetch('/api/downloads/excel-toolbox', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to increment download counter:', error);
    } finally {
      // ダウンロードは通常通り進行
      setIsDownloading(false);
    }
  };

  const platformInfo = {
    windows: {
      icon: (
        <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 12V6.75l8-1.25V12H3zm0 .5h8v6.5l-8-1.25V12.5zM11.5 12V5.35l9.5-1.6V12h-9.5zm0 .5h9.5v8.25l-9.5-1.6V12.5z" />
        </svg>
      ),
      label: 'Windows',
    },
    mac: {
      icon: (
        <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
      label: 'Mac',
    },
  };

  const info = platformInfo[platform];

  return (
    <a
      href={href}
      onClick={handleDownload}
      className={`flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all dark:border-gray-600 ${
        isDownloading
          ? 'cursor-wait opacity-50'
          : 'hover:border-primary-300 hover:bg-primary-50 dark:hover:border-primary-700 dark:hover:bg-primary-900/20'
      }`}
    >
      <div className="flex items-center gap-3">
        {info.icon}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{info.label}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {version} - {fileName}
          </p>
        </div>
      </div>
      <svg
        className="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </a>
  );
}
