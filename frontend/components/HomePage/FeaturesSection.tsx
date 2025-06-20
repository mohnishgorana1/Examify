"use client";

import { useEffect, useState } from "react";


export default function FeaturesSection() {
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
    <section className="relative py-20 px-6 md:px-20 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 right-10 w-40 h-40 bg-emerald-200 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-emerald-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14">
          {user ? "Your Personalized Experience" : "Why Choose Examify?"}
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
