"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Clock, Calendar, Target, CheckCircle } from "lucide-react";

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
  type: "new" | "my-exam";
  score?: number;
  isAttempted: boolean;
  onEnroll?: (examId: string) => void;
  enrolling?: boolean;
};

const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  type,
  onEnroll,
  isAttempted,
  enrolling,
}) => {
  const router = useRouter();
  const now = new Date();
  const examDate = new Date(exam.scheduledAt);
  const isExpired = !isAttempted && examDate < now;

  const handleClick = () => {
    if (type === "new" && onEnroll) {
      onEnroll(exam._id);
    } else if (type === "my-exam") {
      if (isAttempted) {
        router.push(`/exam/${exam._id}/view-result`);
      } else {
        router.push(`/exam/${exam._id}`);
      }
    }
  };

  let buttonText = "View Exam";
  if (type === "new") buttonText = "Enroll Now";
  else if (type === "my-exam") {
    if (isAttempted) buttonText = "View Result";
    else if (isExpired) buttonText = "Give Exam";
    else buttonText = "Start Exam";
  }

  return (
    <div className="bg-gradient-to-b from-neutral-700/10 to-neutral-950  p-5 flex flex-col justify-between rounded-2xl
    shadow-md shadow-neutral-800 hover:shadow-indigo-500   
    transition-all duration-300 hover:scale-[1.02]">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-indigo-400 mb-2 truncate">
          {exam.title}
        </h2>
        <p className="text-sm text-neutral-300 line-clamp-2 mb-4">
          {exam.description}
        </p>

        <div className="text-sm space-y-2 text-neutral-400">
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Duration: {exam.duration} mins
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            Scheduled At:{" "}
            <span className="text-neutral-200">
              {examDate.toLocaleString()}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Total Marks: {exam.totalMarks ?? "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-indigo-400" />
            Passing Marks: {exam.passingMarks ?? "N/A"}
          </p>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={type === "new" && enrolling}
        className={`mt-5 w-full px-4 py-2 rounded-xl font-medium text-white transition-all duration-200 ${
          enrolling
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-sm"
        }`}
      >
        {type === "new" && enrolling ? (
          <span className="flex items-center justify-center gap-2">
            Enrolling <Loader2 className="animate-spin w-4 h-4" />
          </span>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export default ExamCard;
