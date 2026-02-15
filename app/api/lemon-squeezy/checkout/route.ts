import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tier } = await request.json();

    if (!tier || !['basic', 'pro', 'enterprise'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      );
    }

    // Map tier to Lemon Squeezy product ID
    const productIds = {
      basic: process.env.LEMON_SQUEEZY_BASIC_PRODUCT_ID,
      pro: process.env.LEMON_SQUEEZY_PRO_PRODUCT_ID,
      enterprise: process.env.LEMON_SQUEEZY_ENTERPRISE_PRODUCT_ID,
    };

    const productId = productIds[tier as keyof typeof productIds];

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID not configured for this tier' },
        { status: 500 }
      );
    }

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;

    if (!storeId) {
      return NextResponse.json(
        { error: 'Store ID not configured' },
        { status: 500 }
      );
    }

    // Create checkout URL
    const checkoutUrl = `https://chiapuru.lemonsqueezy.com/checkout/buy/${productId}`;

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
