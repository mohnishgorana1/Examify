// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useRouter } from "next/navigation";

// ---------------- Types ----------------
type AuthContextType = {
  accessToken: string | null;
  user: any;
  loading: boolean;
  logout: () => void;
  getValidAccessToken: () => Promise<string | null>;
};

// ---------------- Context Setup ----------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------- Provider ----------------
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ---------------- Token Expiry ----------------
  const isTokenExpired = () => {
    const expiry = localStorage.getItem("accessTokenExpiryTime");

    // if accessTokenExpiryTime not avlb then assume expired
    if (!expiry) return true;

    const expiryTime = parseInt(expiry, 10);
    const currentTime = Math.floor(Date.now() / 1000); // seconds

    if (currentTime >= expiryTime) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiryTime");
      return true;
    }

    return false;
  };

  // ---------------- Refresh Token ----------------
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

        // token aa gya now ab user bhi le ao or save krlo
        const userResponse = await axios.get(`${URLs.backend}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        });
        console.log("user response /me", data);
        if (userResponse?.data?.success) {
          localStorage.setItem("user", JSON.stringify(userResponse.data.user));
          setUser(userResponse.data.user);
        }
        return data.accessToken;
      } else {
        logout();
        return null;
      }
    } catch (err) {
      logout();
      return null;
    }
  };

  // ---------------- Logout ----------------
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiryTime");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
    router.push("/login");
  };

  // ---------------- Access Token ----------------
  const getValidAccessToken = async (): Promise<string | null> => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken || isTokenExpired()) {
      return await refreshAccessToken();
    } else {
      return storedToken;
    }
  };

  // ---------------- Init on load ----------------
  useEffect(() => {
    const init = async () => {
      const token = await getValidAccessToken();
      if (token) {
        setAccessToken(token);

        const userFromLS = localStorage.getItem("user");
        if (userFromLS) {
          try {
            setUser(JSON.parse(userFromLS));
          } catch {
            localStorage.removeItem("user");
          }
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        loading,
        logout,
        getValidAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ---------------- Hook ----------------
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
