import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const priceId = process.env.STRIPE_PRICE_ID;

if (!stripeSecretKey) throw new Error("Missing STRIPE_SECRET_KEY");
if (!appUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");
if (!priceId) throw new Error("Missing STRIPE_PRICE_ID");

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const searchQuery = typeof body?.query === "string" ? body.query : "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/api/checkout/confirm?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?payment=cancelled`,
      metadata: {
        search_query: searchQuery,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return checkout URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}