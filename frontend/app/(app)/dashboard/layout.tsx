"use client";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";


const heroContent: any = {
  instructor: {
    title: "Welcome, Instructor ",
    logo: "👨‍🏫",
    description: "Manage your exams, students, and results.",
  },
  student: {
    title: "Welcome, Student ",
    logo: "🎓",
    description: "Take exams, view your results, and more.",
  },
  admin: {
    title: "Welcome, Admin 🛠️",
    logo: "🛠️",
    description: "Monitor all activities and manage users.",
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, getValidAccessToken, logout } = useAuth();
  const { title, description, logo } =
    heroContent[user?.role] || heroContent["student"];
  return (
    <div className="flex flex-col">
      <div className="">{children}</div>
    </div>
  );
}
