"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role === "student") {
        setAllowed(true);
      } else {
        router.replace(`/dashboard/${user.role}`);
      }
    }
  }, [loading, user, router]);

  if (loading || !allowed) {
    return (
      <div className="text-white text-center py-20 text-xl">
        <main className="h-full pt-5 md:pt-24 px-4 flex flex-col items-center justify-evenly gap-y-4">
        <div className="relative flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.4s]"></div>

          <style jsx>{`
            @keyframes slideDot {
              0% {
                transform: translateX(0);
                opacity: 1;
              }
              50% {
                transform: translateX(10px);
                opacity: 0.5;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
        <h1 className="animate-pulse text-white text-3xl">
          Loading exams...
        </h1>
      </main>
      </div>
    );
  }

  return (
    <main className="flex h-screen flex-col">
      {/* <header className="h-16 bg-neutral-900 shadow flex items-center justify-between px-4">
        <Link
          href={"/"}
          className="flex gap-2 text-2xl font-extrabold tracking-wide font-sans text-orange-500"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="">Examify</span>
        </Link>
      </header> */}
      <div className="min-h-max flex-1 overflow-y-auto bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
        {children}
      </div>
    </main>
  );
}
