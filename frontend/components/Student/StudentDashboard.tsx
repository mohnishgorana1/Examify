// app/dashboard/student/page.tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpcomingExams from "./UpcomingExams";
import MyExams from "./MyExams";
import { useState } from "react";

export default function StudentDashboard() {
  const [tab, setTab] = useState<"my-exams" | "upcoming-exams">("my-exams");

  return (
    // <div className="mx-4 space-y-4">
    //   <section className="flex">
    //     <Tabs
    //       value={tab}
    //       onValueChange={setTab}
    //       className="w-full flex flex-col gap-y-3 items-center justify-center"
    //     >
    //       <TabsList
    //         className="
    //             bg-white border rounded-lg shadow-lg shadow-gray-400 p-1 md:p-2
    //             grid grid-cols-2 gap-2
    //       "
    //       >
    //         <TabsTrigger
    //           className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition"
    //           value="my-exams"
    //         >
    //           📋My Exams
    //         </TabsTrigger>

    //         <TabsTrigger
    //           className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition"
    //           value="upcoming-exams"
    //         >
    //           📚Upcoming Exams
    //         </TabsTrigger>
    //         {/* <TabsTrigger
    //           className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition col-span-2 md:col-span-1"
    //           value="analytics"
    //         >
    //           📊 Analytics
    //         </TabsTrigger> */}
    //       </TabsList>

    //       {/* 🔹 Tab Contents */}
    //       <div className="self-start mt-4 space-y-4 w-full">
    //         <TabsContent value="my-exams">
    //           <MyExams />
    //         </TabsContent>
    //         <TabsContent value="upcoming-exams">
    //           <UpcomingExams />
    //         </TabsContent>
    //         {/* <TabsContent value="analytics">
    //           <MyExams />
    //         </TabsContent> */}
    //       </div>
    //     </Tabs>
    //   </section>
    // </div>
    <div className="px-4 py-6 space-y-6 w-full max-w-screen-xl mx-auto">
      {/* 🔝 Top Nav Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <button
          className={`px-3 py-1 rounded-2xl font-medium border-2 cursor-pointer border-emerald-600 ${
            tab === "my-exams"
              ? "bg-emerald-600 text-white"
              : "bg-white text-emerald-600"
          }`}
          onClick={() => setTab("my-exams")}
        >
          📋 My Exams
        </button>

        <button
          className={`px-3 py-1 rounded-2xl font-medium border-2 cursor-pointer border-emerald-600 ${
            tab === "upcoming-exams"
              ? "bg-emerald-600 text-white"
              : "bg-white text-emerald-600"
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
