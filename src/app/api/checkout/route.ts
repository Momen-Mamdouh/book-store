
  import { NextResponse } from 'next/server';
  import Stripe from 'stripe';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
    typescript: true, 
    timeout: 20000, 
  });

  export async function POST(req: Request) {
    const fallbackImg:string = `${process.env.NEXT_PUBLIC_SITE_URL}/images/default-thunabil_img.jpg`;
    const externalFallback:string = 'https://picsum.photos/seed/book/300/300';
    const { cartItems } = await req.json();

    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cartItems.map((item: any) => ({
          price_data: {
            currency: 'egp',
            product_data: {
              name: item.bookOrder.book_title,
              images: [item.bookOrder.book_img?.trim() || fallbackImg || externalFallback],
            },
            unit_amount: Math.round(item.bookOrder.book_price * 100),
          },
          quantity: item.bookOrder.book_count,
        })),
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders`,
        cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL }/cart`,
      });

      
      return NextResponse.json({ id: session.id});
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
