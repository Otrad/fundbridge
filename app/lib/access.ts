import { cookies } from "next/headers";
import crypto from "crypto";

const ACCESS_COOKIE_NAME = "fundbridge_access";

type AccessPayload = {
  paid: true;
  expiresAt: number;
};

function getAccessCookieSecret() {
  const secret = process.env.ACCESS_COOKIE_SECRET;

  if (!secret) {
    throw new Error("Missing ACCESS_COOKIE_SECRET");
  }

  return secret;
}

function verifySignedAccessCookie(value: string): AccessPayload | null {
  const parts = value.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;
  const accessCookieSecret = getAccessCookieSecret();

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

    return decoded as AccessPayload;
  } catch {
    return null;
  }
}

export async function getAccessState() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ACCESS_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return {
      hasAccess: false,
      expiresAt: null,
    };
  }

  const decoded = verifySignedAccessCookie(cookieValue);

  if (!decoded) {
    return {
      hasAccess: false,
      expiresAt: null,
    };
  }

  return {
    hasAccess: true,
    expiresAt: decoded.expiresAt,
  };
}