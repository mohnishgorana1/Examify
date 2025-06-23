"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ExamCard from "./ExamCard";

type Exam = {
  _id: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
};

export default function UpcomingExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const { getValidAccessToken } = useAuth();
  const router = useRouter();

  const fetchExams = async () => {
    const token = await getValidAccessToken();

    const res = await axios.get(`${URLs.backend}/api/v1/exam/upcoming-exams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) {
      setExams(res.data.exams);
    }
  };

  const handleEnroll = async (examId: string) => {
    try {
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
        alert("✅ Successfully enrolled in the exam!");
        fetchExams(); // Optional: to update the list
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (error: any) {
      console.error("Enrollment error:", error);
      alert("❌ Failed to enroll. Please try again.");
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <section className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam) => (
        <ExamCard
          key={exam._id}
          exam={exam}
          type="upcoming"
          onEnroll={handleEnroll}
        />
      ))}
      {exams && exams.length === 0 && (
        <section className="">No Upcoming Exams</section>
      )}
    </section>
  );
}
