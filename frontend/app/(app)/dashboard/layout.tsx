"use client";
import { ReactNode } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const user = useSelector((state: RootState) => state.user.user);
  const { title, description, logo } =
    heroContent[user?.role] || heroContent["student"];
  return (
    <div className="flex flex-col">
      {/* <section className="mx-4 flex flex-col items-center py-4 gap-y-1">
        <p className=" bg-white  text-xl font-bold sm:text-3xl text-center md:text-start">
          <span className="bg-gradient-to-b from-emerald-200 to-emerald-700 bg-clip-text text-transparent">
            {title}
          </span>
          <span className="">{logo}</span>
        </p>
        <p className="text-emerald-800 font-semibold">
          {description}
        </p>
      </section> */}
      <div className="">{children}</div>
    </div>
  );
}
