"use client";

import { useState } from "react";
import MyExamsStudent from "./MyExamsStudent";
import NewExamsStudent from "./NewExamsStudent";

export default function StudentDashboard() {
  const [tab, setTab] = useState<"my-exams" | "new-exams">("my-exams");

  return (
    <div className="min-h-[90vh] px-4 py-6 space-y-6 w-full mx-auto bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* 🔝 Top Nav Buttons */}
      <div className="relative border border-white/10 rounded-2xl flex w-full md:w-80 mx-auto justify-between items-center backdrop-blur-xl bg-white/5 shadow-[0_0_25px_-8px_rgba(99,102,241,0.25)] p-1 transition-all duration-500">
        <button
          className={`py-2 w-1/2 font-medium tracking-wide transition-all duration-300 ease-in-out rounded-xl ${
            tab === "my-exams"
              ? "bg-gradient-to-r from-indigo-500/90 to-indigo-600/90 text-white shadow-md shadow-indigo-800/40 scale-[1.02]"
              : "text-neutral-400 hover:text-indigo-300 hover:bg-white/10"
          }`}
          onClick={() => setTab("my-exams")}
        >
          📋 My Exams
        </button>

        <button
          className={`py-2 w-1/2 font-medium tracking-wide transition-all duration-300 ease-in-out rounded-xl ${
            tab === "new-exams"
              ? "bg-gradient-to-r from-indigo-500/90 to-indigo-600/90 text-white shadow-md shadow-indigo-800/40 scale-[1.02]"
              : "text-neutral-400 hover:text-indigo-300 hover:bg-white/10"
          }`}
          onClick={() => setTab("new-exams")}
        >
          📚 New Exams
        </button>
      </div>

      {/* 🔄 Conditional rendering */}
      <div className="animate-fadeIn min-h-[70vh]">
        {tab === "my-exams" ? <MyExamsStudent /> : <NewExamsStudent />}
      </div>
    </div>
  );
}
