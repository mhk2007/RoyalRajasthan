import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_LIFETIME_SECONDS = 60 * 60 * 24;

function getSecret() {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_TOKEN_SECRET must contain at least 32 characters");
  }
  return secret;
}

export function createAuthToken(userId) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: String(userId),
      exp: Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyAuthToken(token) {
  try {
    const [payload, suppliedSignature] = String(token).split(".");
    if (!payload || !suppliedSignature) return null;

    const expectedSignature = createHmac("sha256", getSecret())
      .update(payload)
      .digest();
    const actualSignature = Buffer.from(suppliedSignature, "base64url");

    if (
      actualSignature.length !== expectedSignature.length ||
      !timingSafeEqual(actualSignature, expectedSignature)
    ) {
      return null;
    }

    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (
      typeof decoded.sub !== "string" ||
      !decoded.sub ||
      !Number.isInteger(decoded.exp) ||
      decoded.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return { userId: decoded.sub };
  } catch {
    return null;
  }
}
