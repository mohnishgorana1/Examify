// utils/getValidAccessToken.ts
import axios from "axios";
import { URLs } from "@/constants/urls";

export const getValidAccessToken = async (): Promise<string | null> => {
  // Access token from localStorage
  let token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Try using it for now (you can optionally decode & check expiry with jwt-decode if you want)
  if (token) return token;

  // If no token, try refreshing
  try {
    const res = await axios.get(`${URLs.backend}/api/v1/auth/refresh-access-token`, {
      withCredentials: true,
    });

    if (res.data?.success && res.data?.accessToken) {
      const newToken = res.data.accessToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", newToken); // store again
      }
      return newToken;
    }

    return null;
  } catch (err) {
    console.error("🔁 Token refresh failed", err);
    return null;
  }
};
