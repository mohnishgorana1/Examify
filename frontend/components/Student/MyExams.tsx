"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { format } from "date-fns";
import { getValidAccessToken } from "@/utils/getValidAccessToken";
import ExamCard from "./ExamCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Exam = {
  _id: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
  totalMarks?: number;
  passingMarks?: number;
};

type AttemptedExam = Exam & {
  score: number;
  submittedAt: string;
};

export default function MyExams() {
  const [attemptedExams, setAttemptedExams] = useState<AttemptedExam[]>([]);
  const [enrolledOnlyExams, setEnrolledOnlyExams] = useState<Exam[]>([]);
  const [expiredExams, setExpiredExams] = useState<Exam[]>([]);

  const fetchMyExams = async () => {
    const token = await getValidAccessToken();
    const res = await axios.get(`${URLs.backend}/api/v1/exam/my-exams`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      setAttemptedExams(res.data.attemptedExams);
      setEnrolledOnlyExams(res.data.enrolledOnlyExams);
      setExpiredExams(res.data.expiredExams);
    }
  };

  useEffect(() => {
    fetchMyExams();
  }, []);

  return (
    <Tabs defaultValue="attempted" className="w-full space-y-4">
      <TabsList className="bg-transparent rounded-2xl p-1 gap-1 flex flex-wrap w-full">
        <TabsTrigger
          value="attempted"
          className={
            "text-sm px-4 py-2 rounded-xl border-neutral-600 bg-neutral-900 data-[state=active]:bg-white text-white data-[state=active]:text-neutral-900 w-full sm:w-auto"
          }
        >
          ✅ Attempted
        </TabsTrigger>

        <TabsTrigger
          value="enrolled"
          className={
            "text-sm px-4 py-2 rounded-xl border-neutral-600 bg-neutral-900 data-[state=active]:bg-white text-white data-[state=active]:text-neutral-900 w-full sm:w-auto"
          }
        >
          🟡 Enrolled
        </TabsTrigger>

        <TabsTrigger
          value="expired"
          className={
            "text-sm px-4 py-2 rounded-xl border-neutral-600 bg-neutral-900 data-[state=active]:bg-white text-white data-[state=active]:text-neutral-900 w-full sm:w-auto"
          }
        >
          🔴 Missed
        </TabsTrigger>
      </TabsList>

      {/* 🟢 Attempted Exams */}
      <TabsContent value="attempted">
        {attemptedExams.length === 0 ? (
          <p className="text-white w-full flex justify-center items-center text-4xl font-sans mt-8">You have not attempted any Exam...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {attemptedExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} type="my-exam" isAttempted={true}/>
            ))}
          </div>
        )}
      </TabsContent>

      {/* 🟡 Enrolled Only */}
      <TabsContent value="enrolled">
        {enrolledOnlyExams.length === 0 ? (
          <p className="text-white w-full flex justify-center items-center text-4xl font-sans mt-8">No enrolled exams.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {enrolledOnlyExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} type="my-exam" isAttempted={false}/>
            ))}
          </div>
        )}
      </TabsContent>

      {/* 🔴 Missed / Expired */}
      <TabsContent value="expired">
        {expiredExams.length === 0 ? (
          <p className="text-white w-full flex justify-center items-center text-4xl font-sans mt-8">No missed exams.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {expiredExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} type="my-exam" isAttempted={false}/>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
