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

  const refreshUser = async (isInitialLoad = false) => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Only show loader if it's the very first load AND we don't have cached data
    if (!isInitialLoad) {
      setLoading(true);
    }

    try {
      const res = await axios.get("/api/users/me");
      if (res.data.success) {
        const fetchedUser: AppUser = res.data.data;
        setAppUser(fetchedUser);
        localStorage.setItem("appUser", JSON.stringify(fetchedUser));
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      const cachedUserString = localStorage.getItem("appUser");
      let hasCachedData = false;

      if (cachedUserString) {
        try {
          const cachedUser: AppUser = JSON.parse(cachedUserString);
          setAppUser(cachedUser);
          setLoading(false);
          hasCachedData = true;
        } catch (e) {
          console.error("Error parsing cached user data:", e);
          localStorage.removeItem("appUser");
        }
      }
      refreshUser(!hasCachedData); // Pass true if we have no cache, to control the loader
    } else {
      setAppUser(null);
      localStorage.removeItem("appUser");
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]); // Dependencies remain the same

  return (
    <UserContext.Provider value={{ appUser, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppUser = () => useContext(UserContext);
