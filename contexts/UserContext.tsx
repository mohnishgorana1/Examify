"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

interface AppUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  // add any extra fields from MongoDB user schema
}
interface UserContextType {
  appUser: AppUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  appUser: null,
  loading: true,
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me");
      if (res.data.success) {
        setAppUser(res.data.data);
        localStorage.setItem("appUser", JSON.stringify(res.data.data)); //cache it
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🟢 only proceed when Clerk isLoaded
    if (!isLoaded) return;

    if (isSignedIn) {
      refreshUser();
    } else {
      setAppUser(null);
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  return (
    <UserContext.Provider value={{ appUser, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppUser = () => useContext(UserContext);
