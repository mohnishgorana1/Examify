"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ExamCard from "./ExamCard";
import { useAppUser } from "@/contexts/UserContext";
import toast from "react-hot-toast";
import { CheckCircle, Clock, Icon, XCircle } from "lucide-react";

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

export default function MyExamsStudent() {
  const { appUser } = useAppUser();
  const [attemptedExams, setAttemptedExams] = useState<AttemptedExam[]>([]);
  const [enrolledOnlyExams, setEnrolledOnlyExams] = useState<Exam[]>([]);
  const [expiredExams, setExpiredExams] = useState<Exam[]>([]);
  const [isFetchingExams, setIsFetchingExams] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState<
    "attempted" | "enrolled" | "missed"
  >("enrolled");

  const fetchMyExams = async () => {
    const appUserId = appUser?._id;
    setIsFetchingExams(true);
    try {
      const res = await axios.get(
        `/api/exam/student/exams/my?studentId=${appUserId}`
      );
      if (res.data.success) {
        setAttemptedExams(res.data.data.attemptedExams);
        setEnrolledOnlyExams(res.data.data.enrolledOnlyExams);
        setExpiredExams(res.data.data.expiredExams);
      }
    } catch (error) {
      console.log("Error fetching enrolled exams for student", error);
      toast.error("Something went wrong!");
    } finally {
      setIsFetchingExams(false);
    }
  };

  useEffect(() => {
    fetchMyExams();
  }, []);

  const tabs = [
    { key: "attempted", label: "Attempted", icon: <CheckCircle /> },
    { key: "enrolled", label: "Enrolled", icon: <Clock /> },
    { key: "missed", label: "Missed", icon: <XCircle /> },
  ] as const;

  return (
    <div className="w-full min-h-screen py-2 md:py-6 md:px-6 md:p-6 text-white">
      {/* 🔹 Matching Tab Header */}
      <section className="flex  mb-8">
        <div className="flex w-full md:w-auto flex-wrap gap-3 ">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTabSection(tab.key)}
              className={`flex items-center justify-center gap-x-2 
                px-3 md:px-5 py-2 rounded-full border text-sm sm:text-base font-medium transition-all duration-300 ease-in-out
              ${
                activeTabSection === tab.key
                  ? "shadow border-t border-indigo-500 shadow-indigo-500 text-indigo-400"
                  : "border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500"
              }`}
            >
              {/* ✅ Icon only visible on md+ screens */}
              <span className="hidden md:flex">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>
      {/* 🧩 Tab Content */}
      <section className="transition-all duration-300">
        {activeTabSection === "attempted" && (
          <div className="animate-fade-in">
            {attemptedExams.length === 0 ? (
              <p className="text-neutral-400 text-center text-2xl mt-12">
                You have not attempted any Exam...
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {attemptedExams.map((exam) => (
                  <ExamCard
                    key={exam._id}
                    exam={exam}
                    type="my-exam"
                    isAttempted
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTabSection === "enrolled" && (
          <div className="animate-fade-in">
            {enrolledOnlyExams.length === 0 ? (
              <p className="text-neutral-400 text-center text-2xl mt-12">
                No enrolled exams.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {enrolledOnlyExams.map((exam) => (
                  <ExamCard
                    key={exam._id}
                    exam={exam}
                    type="my-exam"
                    isAttempted={false}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTabSection === "missed" && (
          <div className="animate-fade-in">
            {expiredExams.length === 0 ? (
              <p className="text-neutral-400 text-center text-2xl mt-12">
                No missed exams.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {expiredExams.map((exam) => (
                  <ExamCard
                    key={exam._id}
                    exam={exam}
                    type="my-exam"
                    isAttempted={false}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
