import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tier } = await request.json();

    const validTiers = ['standard'];
    if (!tier || !validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      );
    }

    // Map tier to Lemon Squeezy checkout ID (UUID from product page)
    const checkoutIds: Record<string, string | undefined> = {
      standard: '22f265f7-4803-4547-a637-c661dcbed900',
    };

    const checkoutId = checkoutIds[tier];

    if (!checkoutId) {
      return NextResponse.json(
        { error: 'Checkout ID not configured for this tier' },
        { status: 500 }
      );
    }

    // Create checkout URL using checkout ID
    const checkoutUrl = `https://chiapuru.lemonsqueezy.com/checkout/buy/${checkoutId}`;

    // Add redirect URLs as query parameters
    const successUrl = `${process.env.NEXTAUTH_URL || 'https://chiapuru.com'}/apps/excel-toolbox?purchase=success`;
    const cancelUrl = `${process.env.NEXTAUTH_URL || 'https://chiapuru.com'}/apps/excel-toolbox?purchase=cancelled`;

    const fullCheckoutUrl = `${checkoutUrl}?checkout[success_url]=${encodeURIComponent(successUrl)}&checkout[cancel_url]=${encodeURIComponent(cancelUrl)}`;

    return NextResponse.json({
      checkoutUrl: fullCheckoutUrl,
    });
  } catch (error) {
    console.error('Failed to create checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
