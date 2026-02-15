import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Verify webhook signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    if (secret) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = hmac.update(body).digest('hex');

      if (digest !== signature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Parse webhook payload
    const payload = JSON.parse(body);
    const { meta, data } = payload;

    console.log('Lemon Squeezy webhook received:', {
      eventName: meta?.event_name,
      orderId: data?.id,
      customerEmail: data?.attributes?.user_email,
      productId: data?.attributes?.first_order_item?.product_id,
      total: data?.attributes?.total_formatted,
    });

    // Handle different event types
    switch (meta?.event_name) {
      case 'order_created':
        console.log('✅ Order created:', data?.attributes?.user_email);
        // TODO: Store purchase in database, send confirmation email, etc.
        break;

      case 'order_refunded':
        console.log('⚠️ Order refunded:', data?.attributes?.user_email);
        // TODO: Handle refund logic
        break;

      default:
        console.log('Unhandled webhook event:', meta?.event_name);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
