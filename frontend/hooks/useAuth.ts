"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);


  const isTokenExpired = () => {
    const expiry = localStorage.getItem("accessTokenExpiryTime");

    // expiry not present = consider expired
    if (!expiry) {
      return true;
    }
    const expiryTime = parseInt(expiry, 10);
    const currentTime = Math.floor(Date.now() / 1000); // seconds

    if (currentTime >= expiryTime) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiryTime");
      return true;
    }

    return false;
  };

  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.get(
        `${URLs.backend}/api/v1/auth/refresh-access-token`,
        { withCredentials: true }
      );
      if (data?.success && data.accessToken && data.accessTokenExpiryTime) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem(
          "accessTokenExpiryTime",
          data.accessTokenExpiryTime
        );
        setAccessToken(data.accessToken);
        return data.accessToken;
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiryTime");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const getValidAccessToken = async () => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken || isTokenExpired()) {
      return await refreshAccessToken();
    } else {
      return storedToken;
    }
  };

   useEffect(() => {
    (async () => {
      const validToken = await getValidAccessToken();
      if (validToken) setAccessToken(validToken);
      setLoading(false);
    })();
  }, []);

  return{
    accessToken,
    loading,
    logout,
    user,
    getValidAccessToken,
  }
};
