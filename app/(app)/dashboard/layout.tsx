"use client";

import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useAppUser } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { appUser, loading } = useAppUser();

  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!appUser) {
        router.replace("/sign-in");
      } else {
        const role = appUser?.role;
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
  }, [appUser, loading, pathname, router]);

  const role = appUser?.role?.toUpperCase() || "USER";

  if (loading || !allowed) {
    return (
      <div className="text-white text-center py-20 text-xl flex flex-col justify-center items-center mx-auto my-auto w-full min-h-[80vh]">
        <TextShimmerWave
          className="font-mono text-lg md:text-2xl lg:text-4xl"
          duration={0.8}
          spread={1.5}
          zDistance={1}
          scaleDistance={1}
          rotateYDistance={15}
        >
          {`LOADING ${role} DASHBOARD...`}
        </TextShimmerWave>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="">{children}</div>
    </div>
  );
}
