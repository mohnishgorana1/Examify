// utils/ensureAccessToken.ts
import { URLs } from "@/constants/urls";
import axios from "@/lib/axios";

export const ensureAccessToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return accessToken;

  try {
    const res = await axios.get(`${URLs.backend}/api/v1/auth/refresh-access-token`, {
      withCredentials: true,
    });

    if (res.data?.success && res.data?.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data.accessToken;
    }

    return null;
  } catch (err) {
    console.error("Token refresh failed:", err);
    return null;
  }
};
