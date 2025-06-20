"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    // This runs only on client
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
  }, []);

  return (
    <section className="relative overflow-hidden py-24 px-6 md:px-20 text-center bg-gradient-to-r from-emerald-50 to-white">
      {/* Background pattern or gradient blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Crack Exams with <span className="text-emerald-600">Confidence</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Examify helps students, instructors, and admins manage, prepare, and
          succeed in online exams — smarter and faster.
        </p>

        {!user ? (
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button className="bg-emerald-600 text-white px-6 rounded-md text-lg font-semibold hover:bg-emerald-700 transition shadow-md">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant={"secondary"}
                className="border border-emerald-600 text-emerald-600 px-6 rounded-md text-lg font-semibold hover:bg-emerald-50 bg-white transition shadow-sm"
              >
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <Link href={`/dashboard/${user?.role || "/dashboard/student"}`}>
            <Button className="bg-emerald-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-emerald-700 transition shadow-md">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
