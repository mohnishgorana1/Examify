// app/dashboard/student/page.tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpcomingExams from "./UpcomingExams";
import MyExams from "./MyExams";
import { useState } from "react";

export default function StudentDashboard() {
  const [tab, setTab] = useState<"my-exams" | "upcoming-exams">("my-exams");

  return (
    <div className="min-h-[90vh] px-4 py-6 space-y-6 w-full  mx-auto bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950">
      {/* 🔝 Top Nav Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <button
          className={`px-3 py-1 rounded-2xl  text-white cursor-pointer font-medium bg-neutral-950 ${
            tab === "my-exams"
              && "border border-white"
          }`}
          onClick={() => setTab("my-exams")}
        >
          📋 My Exams
        </button>

        <button
          className={`px-3 py-1 rounded-2xl text-white cursor-pointer font-medium bg-neutral-950  ${
            tab === "upcoming-exams"
              && "border border-white"
          }`}
          onClick={() => setTab("upcoming-exams")}
        >
          📚 Upcoming Exams
        </button>
      </div>

      {/* 🔄 Conditional rendering */}
      {tab === "my-exams" ? <MyExams /> : <UpcomingExams />}
    </div>
  );
}
