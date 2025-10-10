"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ExamCard from "./ExamCard";
import toast from "react-hot-toast";
import { useAppUser } from "@/contexts/UserContext";

type Exam = {
  _id: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
};

export default function NewExamsStudent() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { appUser } = useAppUser();

  const router = useRouter();

  const fetchExams = async () => {
    setIsFetching(true);
    const appUserId = appUser?._id;
    try {
      const res = await axios.get(
        `/api/exam/student/exams/new?studentId=${appUserId}`
      );

      if (res.data.success) {
        // toast.success(res.data.message);
        setExams(res.data.data);
      } else {
        toast.error("❌ Enrollment failed");
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  const handleEnroll = async (examId: string) => {
    setEnrollingId(examId);
    const appUserId = appUser?._id;
    try {
      const res = await axios.post(`/api/exam/student/exams/enroll`, {
        studentId: appUserId,
        examId
      });

      if (res.data.success) {
        router.refresh()
        toast.success("✅ Successfully enrolled in the exam!");
        // await fetchExams(); // Optional: to update the list
        setExams(prev => prev.filter(exam => exam._id !== examId));
      } else {
        toast.error("❌ Enrollment failed");
      }
    } catch (error: any) {
      console.error("Enrollment error:", error);
      toast.error("❌ Enrollment failed");
    } finally {
      setEnrollingId(null);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <section className="p-6 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-6 text-center">
        Available Exams
      </h1>
      {isFetching ? (
        <p className="text-neutral-300 text-center animate-pulse">
          Fetching exams...
        </p>
      ) : exams.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <ExamCard
              key={exam._id}
              exam={exam}
              type="new"
              onEnroll={handleEnroll}
              isAttempted={false}
              enrolling={enrollingId === exam._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-neutral-400 font-medium text-xl md:text-4xl py-20">
          No new exams available.
        </div>
      )}
    </section>
  );
}
