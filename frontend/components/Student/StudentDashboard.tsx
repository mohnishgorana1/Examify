// app/dashboard/student/page.tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MyExams from "./MyExams";
import { useState } from "react";
import NewExams from "./NewExams";

export default function StudentDashboard() {
  const [tab, setTab] = useState<"my-exams" | "new-exams">("my-exams");

  return (
    <div className="min-h-[90vh] px-4 py-6 space-y-6 w-full  mx-auto bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950">
      {/* 🔝 Top Nav Buttons */}
      <div className="border border-neutral-700 rounded-2xl flex w-full md:w-76 justify-between items-center text-white">
        <button
          className={`py-1 w-[50%]  ${
            tab === "my-exams" && "bg-black text-white rounded-3xl duration-100"
          }`}
          onClick={() => setTab("my-exams")}
        >
          📋 My Exams
        </button>

        <button
          className={`py-1 w-[50%] ${
            tab === "new-exams" &&
            "bg-black text-white rounded-3xl duration-100"
          }`}
          onClick={() => setTab("new-exams")}
        >
          📚 New Exams
        </button>
      </div>

      {/* 🔄 Conditional rendering */}
      {tab === "my-exams" ? <MyExams /> : <NewExams />}
    </div>
  );
}
