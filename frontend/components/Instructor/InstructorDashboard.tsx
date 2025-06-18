"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import CreateExam from "./CreateExam";
import MyExams from "./MyExams";
import Results from "./Results";
import CreateQuestion from "./CreateQuestion";
import MyQuestions from "./MyQuestions";

export default function InstructorDashboard() {
  const [tab, setTab] = useState("create-exam");

  return (
    <div className="mx-4 space-y-4">
      {/* 🔹 Tab List */}
      <section className="flex">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="w-full flex flex-col gap-y-3 items-center justify-center"
        >
          <TabsList
            className="
                bg-white border rounded-lg shadow-lg shadow-gray-400 p-2 
                grid grid-cols-2 md:grid-cols-5 gap-2
          "
          >
            <TabsTrigger
              className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition"
              value="create-exam"
            >
              📝Create Exam
            </TabsTrigger>
            <TabsTrigger
              className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition"
              value="my-exams"
            >
              📋My Exams
            </TabsTrigger>
            <TabsTrigger
              className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition"
              value="create-questions"
            >
              ➕Create Questions
            </TabsTrigger>
            <TabsTrigger
              className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition"
              value="my-questions"
            >
              📚My Questions
            </TabsTrigger>
            <TabsTrigger
              className="py-1 px-2 text-sm text-center rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition col-span-2 md:col-span-1"
              value="results"
            >
              📊Results
            </TabsTrigger>
          </TabsList>

          {/* 🔹 Tab Contents */}
          <div className="self-start mt-4 space-y-4 w-full">
            <TabsContent value="create-exam">
              <CreateExam />
            </TabsContent>
            <TabsContent value="my-exams">
              <MyExams />
            </TabsContent>
            <TabsContent value="create-questions">
              <CreateQuestion />
            </TabsContent>
            <TabsContent value="my-questions">
              <MyQuestions />
            </TabsContent>
            <TabsContent value="results">
              <Results />
            </TabsContent>
          </div>
        </Tabs>
      </section>
    </div>
  );
}
