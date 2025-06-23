"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function FeaturesSection() {
  const { user } = useAuth();
  const features = user
    ? [
        {
          title: "Quick Access",
          desc: "Access your recent exams, notifications, and messages instantly.",
        },
        {
          title: "Personal Dashboard",
          desc: "Everything you need in one place — results, attempts, and more.",
        },
        {
          title: "Secure Platform",
          desc: "Your data and exam records are stored safely and privately.",
        },
      ]
    : [
        {
          title: "Easy Exam Creation",
          desc: "Create and schedule exams with flexible formats — MCQ, Subjective, and more.",
        },
        {
          title: "Role-Based Dashboards",
          desc: "Students, Instructors, and Admins have tailored interfaces for efficiency.",
        },
        {
          title: "Secure & Scalable",
          desc: "Built with best practices to ensure data safety and performance at scale.",
        },
      ];

  return (
    <section className="min-h-[80vh] md:min-h-[90vh] relative py-16 md:py-16 px-6 md:px-20 bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-10 w-40 h-40 bg-orange-400 opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 left-10 w-40 h-40 bg-orange-400 opacity-5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-14">
          {user ? "Your Personalized Experience" : "Why Choose Examify?"}
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-neutral-500  transition-all duration-300"
            >
              <h3 className="md:text-xl font-semibold text-orange-500 mb-3 text-sm">
                {feature.title}
              </h3>
              <p className="text-neutral-200 leading-relaxed md:text-lg text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
