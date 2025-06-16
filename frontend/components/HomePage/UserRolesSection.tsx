"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function UserRolesSection() {
  const user = useSelector((state: any) => state.user.user);

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
    <section className="py-20 px-6 md:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        {user ? "Know Your Role" : "Who is it for?"}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {roles.map(({ role, desc, href }) => (
          <div
            key={role}
            className="border p-6 rounded-lg hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{role}</h3>
            <p className="text-gray-600 mb-4">{desc}</p>
            {!user && (
              <Link
                href={href}
                className="text-emerald-600 font-medium hover:underline"
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
