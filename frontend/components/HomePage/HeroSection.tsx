"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  return (
    <section className="min-h-[86vh] relative overflow-hidden py-24 px-6 md:px-20 text-center bg-gradient-to-b from-neutral-800 to-neutral-800 flex flex-col items-center justify-center">
      {/* Background pattern or gradient blob */}
      <div className="w-full absolute flex justify-between inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 md:top-10 md:left-10 w-36 h-36 md:w-72 md:h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-10 w-36 h-36 md:w-64 md:h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white-900 mb-6 leading-tight tracking-tight">
          <span className="text-neutral-50">Crack Exams with</span>{" "}
          <span className="text-orange-500">Confidence</span>
        </h1>
        <p className="text-sm md:text-lg lg:text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
          Examify helps students, instructors, and admins manage, prepare, and
          succeed in online exams — smarter and faster.
        </p>

        {!user ? (
          <div className="mx-auto space-x-5">
            <Link href="/register">
              <Button className="cursor-pointer bg-orange-500 hover:bg-orange-500 w-30 md:w-48">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                className="cursor-pointer bg-neutral-50 hover:bg-neutral-300 text-orange-500 w-30 md:w-48"
              >
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <Link href={`/dashboard/${user?.role || "/dashboard/student"}`}>
            <Button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition shadow-md">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
