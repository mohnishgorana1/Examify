"use client";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else {
        const role = user?.role;
        if (
          (pathname.startsWith("/dashboard/student") && role === "student") ||
          (pathname.startsWith("/dashboard/instructor") &&
            role === "instructor")
        ) {
          setAllowed(true);
        } else {
          // If wrong role trying to access, redirect to correct dashboard
          router.replace(`/dashboard/${role}`);
        }
      }
    }
  }, [user, loading, pathname, router]);

  if (loading || !allowed) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="">{children}</div>
    </div>
  );
}
