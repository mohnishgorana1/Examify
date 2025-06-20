"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CTASection() {
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
    <section className="py-16 px-6 md:px-20 bg-emerald-600 text-white text-center rounded-b-4xl">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-4">Need Help Navigating?</h2>
          <p className="text-lg mb-6">
            Visit your dashboard to manage exams, results, and more.
          </p>
          <Link
            href={`/${user.role}`}
            className="bg-white text-emerald-600 px-6 py-3 font-semibold rounded-md hover:bg-gray-100"
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
            href="/register"
            className="bg-white text-emerald-600 px-6 py-3 font-semibold rounded-md hover:bg-gray-100"
          >
            Get Started Now
          </Link>
        </>
      )}
    </section>
  );
}
