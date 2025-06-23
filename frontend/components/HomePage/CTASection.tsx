"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CTASection() {
  const { user } = useAuth();

  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-orange-500 to-orange-700 text-white text-center rounded-b-4xl">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-4">Need Help Navigating?</h2>
          <p className="text-lg mb-6">
            Visit your dashboard to manage exams, results, and more.
          </p>
          <Link
            href={`/${user.role}`}
            className="px-6 py-3 font-semibold duration-300 bg-neutral-900 rounded-xl hover:bg-neutral-950 hover:text-orange-500"
          >
            Go to Dashboard
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">
            Ready to revolutionize exams?
          </h2>
          <p className="text-lg mb-6">
            Join hundreds of users simplifying their online assessments with
            Examify.
          </p>
          <Link
            href={"/register"}
            className="px-6 py-3 font-semibold duration-300 bg-neutral-900 rounded-xl hover:bg-neutral-950 hover:text-orange-500"
          >
            Get Started Now
          </Link>
        </>
      )}
    </section>
  );
}
