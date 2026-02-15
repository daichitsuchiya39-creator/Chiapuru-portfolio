import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tier } = await request.json();

    const validTiers = ['launch', 'early', 'middle', 'regular'];
    if (!tier || !validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      );
    }

    // Map tier to Lemon Squeezy checkout ID (UUID from product page)
    const checkoutIds: Record<string, string | undefined> = {
      launch: '22f265f7-4803-4547-a637-c661dcbed900',  // 1-50: $9.99
      early: '81edcc43-7d39-485c-8236-8abe0934d80a',   // 51-150: $19.99
      middle: '79572ece-520c-4387-9d91-91c21f6a0aaa',  // 151-300: $39.99
      regular: '0e268f43-6bbe-410a-a759-f29382accb98', // 301+: $49.99
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
