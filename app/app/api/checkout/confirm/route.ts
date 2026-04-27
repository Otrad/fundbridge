import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const accessCookieSecret = process.env.ACCESS_COOKIE_SECRET;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!accessCookieSecret) {
  throw new Error("Missing ACCESS_COOKIE_SECRET");
}

const stripe = new Stripe(stripeSecretKey);

const ACCESS_COOKIE_NAME = "fundbridge_access";
const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;
const THIRTY_DAYS_MS = THIRTY_DAYS_SECONDS * 1000;

function createSignedAccessCookie(expiresAt: number) {
  const payload = Buffer.from(
    JSON.stringify({
      paid: true,
      expiresAt,
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", accessCookieSecret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    const paymentIntentId = req.nextUrl.searchParams.get("payment_intent");

    if (!sessionId && !paymentIntentId) {
      return NextResponse.json(
        { error: "Missing session_id or payment_intent" },
        { status: 400 }
      );
    }

    let searchQuery = "";
    let paid = false;

    if (sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        paid = true;
        searchQuery = session.metadata?.search_query ?? "";
      }
    }

    if (!paid && paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === "succeeded") {
        paid = true;
      }
    }

    if (!paid) {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const expiresAt = Date.now() + THIRTY_DAYS_MS;
    const cookieValue = createSignedAccessCookie(expiresAt);

    cookies().set({
      name: ACCESS_COOKIE_NAME,
      value: cookieValue,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      domain: ".fundbridge.se",
      maxAge: THIRTY_DAYS_SECONDS,
      expires: new Date(expiresAt),
    });

    return NextResponse.json({
      ok: true,
      query: searchQuery,
      expiresAt,
      restoredBy: sessionId ? "session_id" : "payment_intent",
    });
  } catch (error) {
    console.error("Stripe confirm error:", error);

    return NextResponse.json(
      { error: "Could not confirm payment" },
      { status: 500 }
    );
  }
}