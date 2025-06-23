"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const { user } = useAuth();

  return (
    <div className="min-h-[75vh] px-5 py-12 md:pt-0 md:pb-10 md:px-20 mx-auto text-center bg-gradient-to-b from-neutral-950 from-20% via-neutral-900 via-85% to-neutral-800 to-95% flex flex-col items-center justify-center">
      {user ? (
        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-white">
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-white-600 mb-4 text-neutral-400">
            Continue where you left off, and track your exam performance.
          </p>
        </section>
      ) : (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-white">Why Choose Examify?</h2>
          <p className="text-white-600 mb-4 text-neutral-400">
            Empowering students and educators to simplify exams with smart
            tools.
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
        <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
            📚 {user ? "Your Exams" : "Smart Exam Creation"}
          </h3>
          <p className="text-neutral-400 text-xs md:text-lg">
            {user
              ? "Quickly access and manage your upcoming and past exams."
              : "Easily create, edit, and manage exams with multiple question types."}
          </p>
        </div>
        <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">👩‍🏫 Role Based Access</h3>
          <p className="text-neutral-400 text-xs md:text-lg">
            Students, Instructors, and Admins each have their own personalized
            dashboard.
          </p>
        </div>
        <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
            📈 {user ? "Your Analytics" : "Performance Analytics"}
          </h3>
          <p className="text-neutral-400 text-xs md:text-lg">
            {user
              ? "See your latest performance metrics and exam scores."
              : "View results, rankings, and progress tracking in real-time."}
          </p>
        </div>
      </div>
    </div>
  );
}
