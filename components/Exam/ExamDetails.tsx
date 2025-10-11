"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppUser } from "@/contexts/UserContext";
import { motion } from "framer-motion";
import { Info, Clock, ListOrdered, CheckCircle2, BookOpen, Trophy, Award } from "lucide-react";

function ExamDetails({ examId }: { examId: string }) {
  const router = useRouter();
  const { appUser } = useAppUser();
  const [examData, setExamData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const examRes = await axios.get(
          `/api/exam/student/exams/${examId}?studentId=${appUser?._id}`
        );
        if (examRes.data.success) {
          setExamData(examRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExamDetails();
  }, [examId]);

  if (loading)
    return (
      <p className="text-neutral-400 text-center py-16 animate-pulse">
        Loading exam details...
      </p>
    );
  if (!examData?.exam) return <p>Exam not found.</p>;

  const { exam, isAttempted } = examData;
  const now = new Date();
  const scheduledTime = new Date(exam.scheduledAt);
  const hasStarted = now >= scheduledTime;

  const truncatedDescription =
    exam.description.length > 160 && !showFullDesc
      ? exam.description.slice(0, 160) + "..."
      : exam.description;

  return (
    <main className="max-w-5xl mx-auto space-y-5 px-3 md:px-6 pt-6 pb-16 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-indigo-500 tracking-tight capitalize">
          {exam.title}
        </h1>

        <p className="text-neutral-300 text-sm md:text-base leading-normal text-justify ">
          {truncatedDescription}
          {exam.description.length > 160 && (
            <button
              onClick={() => setShowFullDesc((prev) => !prev)}
              className="text-indigo-400 ml-2 text-sm hover:underline "
            >
              {showFullDesc ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </motion.div>

      {/* Exam Info */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-md backdrop-blur-sm"
      >
        <InfoRow
          icon={<Clock />}
          label="Duration"
          value={`${exam.duration} min`}
        />
        <InfoRow
          icon={<BookOpen />}
          label="Scheduled"
          value={scheduledTime.toLocaleString()}
        />
        <InfoRow
          icon={<ListOrdered />}
          label="Total Questions"
          value={exam.questions.length}
        />
        <InfoRow
          icon={<CheckCircle2 />}
          label="Marks per Question"
          value={exam.marksPerQuestion}
        />
        <InfoRow
          icon={<Award />}
          label="Total Marks"
          value={exam.totalMarks ?? "NA"}
        />
        <InfoRow
          icon={<Trophy />}
          label="Passing Marks"
          value={exam.passingMarks ?? "NA"}
        />
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-neutral-900/70 border border-indigo-400/30 rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-indigo-400/50 transition"
      >
        <h2 className="text-lg md:text-xl font-semibold text-indigo-400 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Instructions
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-neutral-300 space-y-1">
          <li>Read questions carefully before answering.</li>
          <li>Timer starts immediately once you begin.</li>
          <li>Do not reload or close the browser during the exam.</li>
          <li>All questions are mandatory unless stated.</li>
          <li>Use a stable internet connection.</li>
        </ul>
      </motion.div>

      {/* Action */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full flex justify-center"
      >
        {!hasStarted ? (
          <p className="text-yellow-400 font-medium text-center md:text-lg underline underline-offset-4">
            Exam has not started yet. Come back at the scheduled time.
          </p>
        ) : isAttempted ? (
          <Button
            onClick={() => router.push(`/exam/${examId}/view-result`)}
            className="bg-indigo-500 hover:bg-indigo-600 px-8 py-2 text-lg rounded-lg shadow-md transition-all duration-200"
          >
            View Result
          </Button>
        ) : (
          <button
            onClick={() => router.push(`/exam/${examId}/exam-room`)}
            className="w-full bg-green-700 hover:bg-green-800 text-white px-8 py-2 font-semibold text-lg rounded-lg shadow-md transition-all duration-200"
          >
            Start Exam
          </button>
        )}
      </motion.div>
    </main>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-neutral-300 text-sm md:text-base">
      {icon && <span className="text-indigo-400">{icon}</span>}
      <p>
        <strong className="text-white">{label}:</strong> {value}
      </p>
    </div>
  );
}

export default ExamDetails;
