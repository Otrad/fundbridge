import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const accessCookieSecret = process.env.ACCESS_COOKIE_SECRET;

if (!stripeSecretKey) throw new Error("Missing STRIPE_SECRET_KEY");
if (!accessCookieSecret) throw new Error("Missing ACCESS_COOKIE_SECRET");

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
    .createHmac("sha256", accessCookieSecret!)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.redirect(
        "https://fundbridge.se/?payment=missing_session"
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(
        "https://fundbridge.se/?payment=not_paid"
      );
    }

    const searchQuery = session.metadata?.search_query ?? "";
    const expiresAt = Date.now() + THIRTY_DAYS_MS;
    const cookieValue = createSignedAccessCookie(expiresAt);

    const redirectUrl = new URL("https://fundbridge.se/");

    if (searchQuery) {
      redirectUrl.searchParams.set("q", searchQuery);
    }

    redirectUrl.searchParams.set("access", "unlocked");

    const res = NextResponse.redirect(redirectUrl);

    res.cookies.set({
      name: ACCESS_COOKIE_NAME,
      value: cookieValue,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      domain: ".fundbridge.se",
      maxAge: THIRTY_DAYS_SECONDS,
      expires: new Date(expiresAt),
    });

    return res;
  } catch (error) {
    console.error("Stripe confirm error:", error);

    return NextResponse.redirect(
      "https://fundbridge.se/?payment=confirm_error"
    );
  }
}