'use client'
import { useAuth } from "@/context/AuthContext";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Already logged in, redirect to their dashboard
      router.replace(`/dashboard/${user.role}`);
    }
  }, [loading, user, router]);

  return (
    <main className="flex h-screen flex-col">
      <header className="h-16 bg-neutral-900 shadow flex items-center justify-between px-4">
        <Link
          href={"/"}
          className="flex gap-2 text-2xl font-extrabold tracking-wide font-sans text-orange-500"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="">Examify</span>
        </Link>
      </header>
      <div className="min-h-max flex-1 overflow-y-auto bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
        {children}
      </div>
    </main>
  );
}
