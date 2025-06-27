"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ExamCard from "./ExamCard";
import toast from "react-hot-toast";

type Exam = {
  _id: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
};

export default function NewExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const { getValidAccessToken } = useAuth();
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const router = useRouter();
  const fetchExams = async () => {
    const token = await getValidAccessToken();

    const res = await axios.get(`${URLs.backend}/api/v1/exam/new-exams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) {
      setExams(res.data.exams);
    }
  };

  const handleEnroll = async (examId: string) => {
    try {
      setEnrollingId(examId);
      const token = await getValidAccessToken();

      const res = await axios.post(
        `${URLs.backend}/api/v1/exam/enroll`,
        { examId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Successfully enrolled in the exam!");
        fetchExams(); // Optional: to update the list
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
    <section className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
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
      {exams && exams.length === 0 && (
        <section className="w-full col-span-2 md:cols-span-3  text-white font-bold text-4xl">
          <p>No New Exams..</p>
        </section>
      )}
    </section>
  );
}
