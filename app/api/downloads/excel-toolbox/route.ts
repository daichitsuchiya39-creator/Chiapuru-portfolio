import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'private', 'download-counter.json');

interface CounterData {
  count: number;
  lastUpdated: string;
}

interface PricingTier {
  name: string;
  maxDownloads: number;
  price: number;
}

const PRICING_TIERS: PricingTier[] = [
  { name: 'free', maxDownloads: 50, price: 0 },
  { name: 'early51', maxDownloads: 100, price: 9.99 },
  { name: 'early101', maxDownloads: 200, price: 19.99 },
  { name: 'basic', maxDownloads: Infinity, price: 29.99 },
];

function getCurrentTier(count: number) {
  for (let i = 0; i < PRICING_TIERS.length; i++) {
    const tier = PRICING_TIERS[i];
    if (count < tier.maxDownloads) {
      const remaining = tier.maxDownloads - count;
      const nextTier = i < PRICING_TIERS.length - 1 ? PRICING_TIERS[i + 1] : null;

      return {
        currentTier: {
          name: tier.name,
          price: tier.price,
          remaining,
          maxDownloads: tier.maxDownloads,
        },
        nextTier: nextTier
          ? {
              name: nextTier.name,
              price: nextTier.price,
              startsAt: tier.maxDownloads,
            }
          : null,
      };
    }
  }

  // Enterprise tier (unlimited)
  const enterpriseTier = PRICING_TIERS[PRICING_TIERS.length - 1];
  return {
    currentTier: {
      name: enterpriseTier.name,
      price: enterpriseTier.price,
      remaining: Infinity,
      maxDownloads: Infinity,
    },
    nextTier: null,
  };
}

async function getCount(): Promise<number> {
  try {
    const data = await fs.readFile(COUNTER_FILE, 'utf-8');
    const parsed: CounterData = JSON.parse(data);
    return parsed.count || 0;
  } catch {
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

  const dir = path.dirname(COUNTER_FILE);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(COUNTER_FILE, JSON.stringify(data, null, 2));
  return newCount;
}

export async function GET(request: NextRequest) {
  try {
    const count = await getCount();
    const tierInfo = getCurrentTier(count);

    return NextResponse.json({
      total: count,
      ...tierInfo,
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
    const tierInfo = getCurrentTier(newCount);

    return NextResponse.json({
      total: newCount,
      ...tierInfo,
    });
  } catch (error) {
    console.error('Failed to increment download count:', error);
    return NextResponse.json(
      { error: 'Failed to increment download count' },
      { status: 500 }
    );
  }
}
