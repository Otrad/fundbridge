import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const accessCookieSecret = process.env.ACCESS_COOKIE_SECRET;
const adminRestoreKey = process.env.ADMIN_RESTORE_KEY;

if (!stripeSecretKey) throw new Error("Missing STRIPE_SECRET_KEY");
if (!accessCookieSecret) throw new Error("Missing ACCESS_COOKIE_SECRET");
if (!adminRestoreKey) throw new Error("Missing ADMIN_RESTORE_KEY");

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

async function isPaidPayment(paymentId: string) {
  if (paymentId.startsWith("pi_")) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    return paymentIntent.status === "succeeded";
  }

  if (paymentId.startsWith("py_")) {
    const payment = await stripe.paymentIntents.retrieve(paymentId);
    return payment.status === "succeeded";
  }

  if (paymentId.startsWith("cs_")) {
    const session = await stripe.checkout.sessions.retrieve(paymentId);
    return session.payment_status === "paid";
  }

  return false;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const key = url.searchParams.get("key");
    const payment = url.searchParams.get("payment");

    if (key !== adminRestoreKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!payment) {
      return NextResponse.json(
        { error: "Missing payment" },
        { status: 400 }
      );
    }

    const paid = await isPaidPayment(payment);

    if (!paid) {
      return NextResponse.json(
        { error: "Payment not completed or not found" },
        { status: 400 }
      );
    }

    const expiresAt = Date.now() + THIRTY_DAYS_MS;
    const cookieValue = createSignedAccessCookie(expiresAt);

    const res = NextResponse.redirect(
      new URL("/sok?access=restored", req.url)
    );

    res.cookies.set({
      name: ACCESS_COOKIE_NAME,
      value: cookieValue,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: THIRTY_DAYS_SECONDS,
      expires: new Date(expiresAt),
    });

    return res;
  } catch (error) {
    console.error("Stripe restore error:", error);

    return NextResponse.json(
      { error: "Could not restore access" },
      { status: 500 }
    );
  }
}