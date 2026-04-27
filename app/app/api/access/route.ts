import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const accessCookieSecret = process.env.ACCESS_COOKIE_SECRET;

if (!accessCookieSecret) {
  throw new Error("Missing ACCESS_COOKIE_SECRET");
}

const ACCESS_COOKIE_NAME = "fundbridge_access";

function verifySignedAccessCookie(value: string) {
  const parts = value.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", accessCookieSecret)
    .update(payload)
    .digest("base64url");

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (!decoded?.paid || typeof decoded?.expiresAt !== "number") {
      return null;
    }

    if (Date.now() > decoded.expiresAt) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cookieValue = req.cookies.get(ACCESS_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return NextResponse.json({ hasAccess: false });
  }

  const decoded = verifySignedAccessCookie(cookieValue);

  if (!decoded) {
    return NextResponse.json({ hasAccess: false });
  }

  return NextResponse.json({
    hasAccess: true,
    expiresAt: decoded.expiresAt,
  });
}

