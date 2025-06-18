import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "examify_auth_access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "examify_auth_refresh_secret";


  // Generate Access Token (Short-lived, e.g., 15 min)
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

// Generate Refresh Token (Longer-lived, e.g., 7 days)
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
