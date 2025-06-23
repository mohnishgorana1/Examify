"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserRolesSection() {
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

  const roles = [
    {
      role: "Student",
      desc: "Take exams, view results, and track your progress easily.",
      href: "/register",
    },
    {
      role: "Instructor",
      desc: "Create, manage, and evaluate exams for your students.",
      href: "/register",
    },
    {
      role: "Admin",
      desc: "Manage the platform, users, and permissions with full control.",
      href: "/register",
    },
  ];

  return (
    <section className="min-h-[60vh] pt-2 pb-24 px-6 md:px-20 bg-gradient-to-b bg-neutral-950 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {user ? "Know Your Role" : "Who is it for?"}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {roles.map(({ role, desc, href }) => (
          <div
            key={role}
            className="border p-6 rounded-lg shadow-md hover:shadow-neutral-400 duration-500 transition"
          >
            <h3 className="md:text-xl text-lg font-semibold mb-2 ">{role}</h3>
            <p className="md:text-sm text-xs text-white-600 mb-4">{desc}</p>
            {!user && (
              <Link
                href={href}
                className="md:text-lg text-xs text-orange-500 font-medium hover:underline"
              >
                Get Started →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
