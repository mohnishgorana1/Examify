import crypto from "crypto";

const SHARED_SECRET = process.env.SHARED_SECRET!; // keep same across services

export function signData(data: string) {
  return crypto.createHmac("sha256", SHARED_SECRET).update(data).digest("hex");
}

export function verifySignature(data: string, signature: string) {
  const expected = signData(data);
  return expected === signature;
}
