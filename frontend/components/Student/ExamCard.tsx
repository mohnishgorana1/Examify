"use client";
import React from "react";
import { useRouter } from "next/navigation";

type ExamCardProps = {
  exam: {
    _id: string;
    title: string;
    description: string;
    scheduledAt: string;
    duration: number;
    totalMarks?: number;
    passingMarks?: number;
    score?: number;
    submittedAt?: string;
  };
  type: "upcoming" | "my-exam";
  onEnroll?: (examId: string) => void;
};

const ExamCard: React.FC<ExamCardProps> = ({ exam, type, onEnroll }) => {
  const router = useRouter();
  const now = new Date();
  const examDate = new Date(exam.scheduledAt);

  const isAttempted = exam.score !== undefined;
  const isExpired = !isAttempted && examDate < now;

  const handleClick = () => {
    if (type === "upcoming" && onEnroll) {
      onEnroll(exam._id);
    } else if (type === "my-exam") {
      router.push(`/student/exam/${exam._id}`);
    }
  };

  let buttonText = "View Exam";
  if (type === "upcoming") {
    buttonText = "Enroll Now";
  } else if (type === "my-exam") {
    if (isAttempted) buttonText = "View Result";
    else if (isExpired) buttonText = "Missed";
    else buttonText = "Start Exam";
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-lg font-semibold text-emerald-700">
        {exam.title.toUpperCase()}
      </h2>
      <p className="text-sm text-gray-600 mb-2">{exam.description}</p>

      <div className="text-sm space-y-1 text-gray-700 mb-3">
        <p>
          <strong>Duration:</strong> {exam.duration} mins
        </p>
        <p>
          <strong>Scheduled At:</strong>{" "}
          {examDate.toLocaleString()}
        </p>
        {exam.totalMarks !== undefined && (
          <p>
            <strong>Total Marks:</strong> {exam.totalMarks}
          </p>
        )}
        {exam.passingMarks !== undefined && (
          <p>
            <strong>Passing Marks:</strong> {exam.passingMarks}
          </p>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={type === "my-exam" && isExpired}
        className={`px-4 py-1 rounded-xl text-white cursor-pointer transition ${
          type === "upcoming"
            ? "bg-emerald-600 hover:bg-emerald-700"
            : isAttempted
            ? "bg-blue-600 hover:bg-blue-700"
            : isExpired
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ExamCard;
