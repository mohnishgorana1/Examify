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
    submittedAt?: string;
  };
  type: "upcoming" | "my-exam";
  score?: number;
  isAttempted: boolean;
  onEnroll?: (examId: string) => void;
};

const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  type,
  onEnroll,
  isAttempted,
}) => {
  const router = useRouter();
  const now = new Date();
  const examDate = new Date(exam.scheduledAt);

  const isExpired = !isAttempted && examDate < now;

  const handleClick = () => {
    if (type === "upcoming" && onEnroll) {
      onEnroll(exam._id);
    } else if (type === "my-exam") {
      if (isAttempted) {
        router.push(`/exam/${exam._id}/view-result`);
      } else {
        console.log("Navigating to exam ID:", exam._id, exam._id.length);
        router.push(`/exam/${exam._id}`);
      }
    }
  };

  let buttonText = "View Exam";

  if (type === "upcoming") {
    buttonText = "Enroll Now";
  } else if (type === "my-exam") {
    if (isAttempted) {
      buttonText = "View Result";
    } else if (isExpired) {
      buttonText = "Missed";
    } else {
      buttonText = "Start Exam";
    }
  }

  return (
    <div className="bg-neutral-800 rounded-lg p-4 transition flex flex-col items-start justify-between gap-y-2">
      <h2 className="text-lg font-semibold text-orange-500">
        {exam.title.toUpperCase()}
      </h2>
      <p className="text-sm text-neutral-200 capitalize mb-2">
        {exam.description}
      </p>

      <div className="text-sm space-y-1 text-neutral-300 mb-3">
        <p>
          <strong>Duration:</strong> {exam.duration} mins
        </p>
        <p>
          <strong>Scheduled At:</strong> {examDate.toLocaleString()}
        </p>

        <p>
          <strong>Total Marks:</strong>{" "}
          {exam.totalMarks ? exam.totalMarks : "NA"}
        </p>

        <p>
          <strong>Passing Marks:</strong>{" "}
          {exam.passingMarks ? exam.passingMarks : "NA"}
        </p>
      </div>

      <button
        onClick={handleClick}
        disabled={type === "upcoming"}
        className={`px-4 py-1 rounded-xl text-white transition
          ${
            type !== "my-exam"
              ? "bg-gray-500 cursor-not-allowed opacity-60"
              : "bg-orange-500 hover:bg-orange-500/85 cursor-pointer"
          }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ExamCard;
