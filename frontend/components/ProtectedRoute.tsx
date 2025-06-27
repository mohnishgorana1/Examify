// components/auth/ProtectedLayout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.replace(`/dashboard/${user.role}`);
      }
    }
  }, [loading, user, allowedRoles, router]);

  if (loading || !user) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
