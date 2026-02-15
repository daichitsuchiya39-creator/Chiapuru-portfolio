import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const MAX_FREE_DOWNLOADS = 300;
const COUNTER_FILE = path.join(process.cwd(), 'private', 'download-counter.json');

interface CounterData {
  count: number;
  lastUpdated: string;
}

async function getCount(): Promise<number> {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf-8');
    const parsed: CounterData = JSON.parse(data);
    return parsed.count || 0;
  } catch {
    // ファイルが存在しない場合は0を返す
    return 0;
  }
}

async function incrementCount(): Promise<number> {
  const currentCount = await getCount();
  const newCount = currentCount + 1;
  const data: CounterData = {
    count: newCount,
    lastUpdated: new Date().toISOString(),
  };

  // ディレクトリが存在しない場合は作成
  const dir = path.dirname(COUNTER_FILE);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(COUNTER_FILE, JSON.stringify(data, null, 2));
  return newCount;
}

export async function GET(request: NextRequest) {
  try {
    const count = await getCount();
    const remaining = Math.max(0, MAX_FREE_DOWNLOADS - count);
    const isFree = count < MAX_FREE_DOWNLOADS;

    return NextResponse.json({
      total: count,
      remaining,
      isFree,
      maxFree: MAX_FREE_DOWNLOADS,
    });
  } catch (error) {
    console.error('Failed to get download count:', error);
    return NextResponse.json(
      { error: 'Failed to get download count' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCount = await incrementCount();
    const remaining = Math.max(0, MAX_FREE_DOWNLOADS - newCount);
    const isFree = newCount <= MAX_FREE_DOWNLOADS;

    return NextResponse.json({
      total: newCount,
      remaining,
      isFree,
      maxFree: MAX_FREE_DOWNLOADS,
    });
  } catch (error) {
    console.error('Failed to increment download count:', error);
    return NextResponse.json(
      { error: 'Failed to increment download count' },
      { status: 500 }
    );
  }
}
