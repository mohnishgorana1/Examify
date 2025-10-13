"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppUser } from "@/contexts/UserContext";
import { formatTimeTaken } from "@/lib/utils";

// Define the submission data structure
interface ISubmission {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
    // Assuming 'phone' is also available on the populated studentId object if needed in the popover
    phone?: string;
  };
  score: number;
  status: "started" | "submitted" | "auto-submitted";
  submittedAt: string;
  timeTaken: number; // in seconds (s)
  attemptNumber: number; // Added from the reference
  startedAt: string;
  isAutoSubmitted: boolean; // Added from the reference
}

interface IExamDetails {
  title: string;
  questions: any[]; // To get question count
  marksPerQuestion: number;
  totalMarks: number;
  passingMarks: number;
  // ... other exam details
}

// Helper component for Exam Details
const DetailItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) => (
  <article className="relative flex items-center gap-x-1 px-1 py-0.5">
    <span className="bg-indigo-500 rounded-full h-2 w-2 mr-1 flex-shrink-0" />
    <p className="font-semibold text-neutral-400 flex-grow">{label}:</p>
    <p className={`font-bold absolute right-3 ${color}`}>{value}</p>
  </article>
);

// Helper component for Popover
const SubmissionDetailPopover = ({
  submission,
}: {
  submission: ISubmission;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="font-semibold bg-indigo-500 py-1.5 px-4 rounded-xl text-xs sm:text-sm text-white hover:bg-indigo-600 transition-colors duration-200 w-full md:w-auto flex justify-center items-center">
          Details
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="bg-neutral-800 text-white border border-indigo-500/50 shadow-xl"
      >
        <div className="text-xs md:text-sm space-y-1">
          <p>
            <span className="font-semibold text-neutral-300">Attempt:</span>{" "}
            {submission.attemptNumber}
          </p>
          <p>
            <span className="font-semibold text-neutral-300">Status:</span>{" "}
            <span className="capitalize">
              {submission.status.replace("-", " ")}
            </span>
          </p>
          <p>
            <span className="font-semibold text-neutral-300">Started:</span>{" "}
            {new Date(submission.startedAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-neutral-300">Submitted:</span>{" "}
            {new Date(submission.submittedAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-neutral-300">
              Auto Submitted:
            </span>{" "}
            {submission.isAutoSubmitted ? "Yes ✅" : "No ❌"}
          </p>
          {submission.studentId?.phone && (
            <p>
              <span className="font-semibold text-neutral-300">Phone:</span>{" "}
              {submission.studentId?.phone}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Loader: React.FC = () => {
  return (
    <div className="relative flex space-x-2">
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite]"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.4s]"></div>

      <style jsx>{`
        @keyframes slideDot {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(10px);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

function ViewExamSubmissions({ examId }: { examId: string }) {
  const [submissions, setSubmissions] = useState<ISubmission[] | null>(null);
  const [examDetails, setExamDetails] = useState<IExamDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { appUser } = useAppUser();

  const fetchSubmissions = async () => {
    // ... (fetchSubmissions logic remains the same)
    if (!examId || !appUser?._id) {
      setIsLoading(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSubmissions(null);

    try {
      const { data } = await axios.get(
        `/api/exam/instructor/exams/${examId}/submissions?instructorId=${appUser._id}`
      );

      if (data.success) {
        setSubmissions(data.data.submissions);
        setExamDetails(data.data.exam);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch submissions.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (appUser?._id) {
      fetchSubmissions();
    }
  }, [examId, appUser?._id]);

  // Sorting logic based on Score (desc) and Time Taken (asc)
  const sortedSubmissions = useMemo(() => {
    if (!submissions) return [];
    return [...submissions].sort((a, b) => {
      // Primary sort: Score (Higher score first: b.score - a.score)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Secondary sort: Time Taken (Lower time first: a.timeTaken - b.timeTaken)
      return a.timeTaken - b.timeTaken;
    });
  }, [submissions]);

  if (isLoading) {
    return (
      <section className="w-full h-[95vh] flex items-center justify-center bg-neutral-900">
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400 text-lg bg-neutral-900 h-screen">
        Error: {error}
      </div>
    );
  }

  if (sortedSubmissions.length === 0 || !examDetails) {
    return (
      <div className="h-[90vh] bg-gradient-to-b from-neutral-900 from-50% to-80% to-indigo-950 flex flex-col items-center justify-center w-full md:w-auto">
        <h1 className="leading  text-3xl md:text-6xl font-extrabold text-neutral-200 text-center md:text-left">
          No submitted attempts <br /> found for this exam yet.
        </h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-y-6 md:gap-y-10 py-6 bg-neutral-900 min-h-screen">
      {/* HEADER SECTION - Same as before, already responsive */}
      <header className="px-4 md:px-8 lg:px-16 w-full flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
        {/* Title */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-200 text-center md:text-left">
            Submissions for
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-400 brightness-150 uppercase break-words text-center md:text-left max-w-full">
            {examDetails?.title}
          </p>
        </div>

        {/* Exam Details Card */}
        <div className="w-full max-w-md p-4 rounded-xl text-sm border border-neutral-700 bg-neutral-800 shadow-xl self-center md:self-auto">
          <h2 className="text-lg font-bold text-neutral-300 mb-2 border-b border-neutral-700 pb-1">
            Exam Overview
          </h2>
          <DetailItem
            label="Total Questions"
            value={examDetails?.questions?.length || 0}
            color="text-indigo-400"
          />
          <DetailItem
            label="Marks Per Question"
            value={examDetails?.marksPerQuestion}
            color="text-indigo-400"
          />
          <DetailItem
            label="Total Marks"
            value={examDetails?.totalMarks}
            color="text-indigo-400"
          />
          <DetailItem
            label="Passing Marks"
            value={examDetails?.passingMarks}
            color="text-green-400"
          />
        </div>
      </header>

      {/* --- */}

      {/* SUBMISSIONS LIST SECTION - HIGH DENSITY LIST/TABLE VIEW */}
      <section className="px-4 md:px-8 lg:px-16 w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-300 text-center md:text-left">
          Student Ranking ({sortedSubmissions.length} Total Submissions)
        </h2>

        <div className="w-full max-w-5xl mx-auto border border-neutral-700 rounded-xl shadow-2xl overflow-hidden bg-neutral-800">
          {/* List Header (Visible on Desktop) */}
          <div className="hidden sm:grid grid-cols-12 gap-x-2 py-3 px-4 text-xs font-semibold uppercase text-neutral-400 border-b border-neutral-700">
            <span className="col-span-1 text-center">Rank</span>
            <span className="col-span-4">Student Name</span>
            <span className="col-span-2 text-center">Score</span>
            <span className="col-span-3 text-center">Time Taken</span>
            <span className="col-span-2 text-center">Result</span>
          </div>

          {/* Submission Items */}
          <div className="divide-y divide-neutral-700/50 max-h-[70vh] overflow-y-auto">
            {sortedSubmissions.map((submission, idx) => {
              const isPass = submission.score >= examDetails.passingMarks;
              const rankColor =
                idx === 0
                  ? "text-yellow-400"
                  : idx === 1
                  ? "text-slate-300"
                  : idx === 2
                  ? "text-amber-600"
                  : "text-indigo-400";
              const bgColorClass =
                idx % 2 === 0 ? "bg-neutral-800" : "bg-neutral-800/80";

              return (
                <div
                  key={submission._id}
                  className={`p-3 hover:bg-neutral-700/70 transition-colors duration-150 ${bgColorClass}`}
                >
                  {/* MOBILE VIEW (Stacked card-like row) */}
                  <div className="flex sm:hidden items-center gap-x-3 w-full">
                    {/* Rank */}
                    <p
                      className={`font-extrabold text-2xl w-8 text-center flex-shrink-0 ${rankColor}`}
                    >
                      #{idx + 1}
                    </p>

                    {/* Details Stack */}
                    <div className="flex flex-col flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-base text-white truncate max-w-[60%]">
                          {submission?.studentId?.name}
                        </p>
                        <span
                          className={`font-bold text-lg ${
                            isPass ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {submission?.score} pts
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-neutral-400">
                        <p className="truncate max-w-[60%]">
                          {submission?.studentId?.email}
                        </p>
                        <p>
                          <span className="text-indigo-300">
                            {formatTimeTaken(submission?.timeTaken)}
                          </span>
                        </p>
                      </div>
                      <div className="mt-2 w-full">
                        <SubmissionDetailPopover submission={submission} />
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP VIEW (Grid/Table Row) */}
                  <div className="hidden sm:grid grid-cols-12 gap-x-2 items-center text-sm">
                    {/* Rank */}
                    <p
                      className={`col-span-1 font-extrabold text-lg text-center ${rankColor}`}
                    >
                      #{idx + 1}
                    </p>

                    {/* Student Name/Email */}
                    <div className="col-span-4 flex flex-col min-w-0">
                      <p className="font-semibold text-white truncate">
                        {submission?.studentId?.name}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        {submission?.studentId?.email}
                      </p>
                    </div>

                    {/* Score */}
                    <p className="col-span-2 font-bold text-center text-lg">
                      <span className="text-white">{submission?.score}</span>
                      <span className="text-neutral-400">
                        /{examDetails?.totalMarks}
                      </span>
                    </p>

                    {/* Time Taken */}
                    <p className="col-span-3 text-center text-indigo-300 font-semibold">
                      {formatTimeTaken(submission?.timeTaken)}
                    </p>

                    {/* Result and Details Button */}
                    <div className="col-span-2 flex flex-col gap-1 items-center">
                      <span
                        className={`font-bold ${
                          isPass ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isPass ? "PASS" : "FAIL"}
                      </span>
                      <SubmissionDetailPopover submission={submission} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}

export default ViewExamSubmissions;
