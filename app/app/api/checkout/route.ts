import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const priceId = process.env.STRIPE_PRICE_ID;
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!stripeSecretKey) throw new Error("Missing STRIPE_SECRET_KEY");
if (!priceId) throw new Error("Missing STRIPE_PRICE_ID");
if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body?.query ?? "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/api/checkout/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?payment=cancelled`,
      metadata: {
        search_query: query,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "checkout_failed" },
      { status: 500 }
    );
  }
}