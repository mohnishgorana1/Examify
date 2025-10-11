"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { useAppUser } from "@/contexts/UserContext";

type QuestionType = "mcq" | "truefalse";

type Question = {
  _id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};
type Exam = {
  _id: string;
  title: string;
  description: string;
  duration: number;
  scheduledAt: string;
  questions: Question[];
  totalMarks?: number;
  passingMarks?: number;
};

type Answer = {
  questionId: string;
  selectedOption: number;
};

type Submission = {
  answers: Answer[];
  score: number;
  submittedAt: string;
};

export default function ViewResultRoom() {
  const { examId } = useParams();
  const { appUser } = useAppUser();

  const [exam, setExam] = useState<Exam | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = exam?.questions[currentQuestionIndex];

  const getSelectedAnswer = (questionId: string) =>
    submission?.answers.find((a) => a.questionId === questionId)
      ?.selectedOption;

  const getQuestionStatusColor = (q: Question) => {
    const selected = getSelectedAnswer(q._id);
    if (selected === undefined) return "bg-neutral-700"; // Not answered
    return selected === q.correctAnswer ? "bg-green-600" : "bg-red-600";
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `/api/exam/student/exams/${examId}/result?studentId=${appUser?._id}`
        );
        setExam(res.data.data.exam);
        setSubmission(res.data.data.submission);
      } catch (err) {
        console.error("Error fetching result", err);
      }
    };

    if (examId) fetchResult();
  }, [examId]);

  if (!exam || !submission) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-950 text-neutral-200 text-xl">
        Loading Result...
      </div>
    );
  }

  const passingMarks = exam.passingMarks;

  return (
    <div className="space-y-3 md:space-y-6 relative min-h-screen scroll-pb-14 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-3 md:py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl md:text-3xl font-semibold tracking-tight text-indigo-500 hover:text-indigo-400 transition-colors duration-200"
          >
            <GraduationCap size={26} className="text-indigo-500 animate-pulse" />
            <span className="font-[Playfair_Display]">Examify</span>
          </Link>

          <Link
            href="/dashboard/student"
            className="text-sm md:text-base border border-indigo-500/70 text-indigo-400 hover:text-indigo-300 hover:border-indigo-400 rounded-lg px-4 py-1.5 transition-all duration-300 shadow-sm hover:shadow-indigo-500/20"
          >
            Visit Dashboard
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="text-neutral-100 md:grid md:grid-cols-11 md:px-4 items-center flex flex-col gap-y-3">
        <div className="w-full md:col-span-8 flex gap-y-2 items-center justify-between px-2 md:px-2">
          <h1 className="text-xl md:text-3xl font-semibold tracking-tight capitalize">
            {exam.title}
          </h1>
          <span
            className={`${
              submission.score >= passingMarks! ? "bg-green-600/80" : "bg-red-600/80"
            } px-4 py-2 rounded-full text-xs md:text-sm w-32 text-center shadow-sm`}
          >
            {submission.score >= passingMarks! ? "Passed" : "Failed"}
          </span>
        </div>

        <div className="md:col-span-3 font-medium text-neutral-100 text-sm md:text-md w-full px-3 ">
          <div className="bg-neutral-900/70 border border-neutral-700 px-4 py-2 rounded-full flex md:items-center justify-evenly shadow-sm shadow-indigo-400">
            <p>
              <span className="text-neutral-400">Score:</span>{" "}
              {submission.score}
            </p>
            <p>
              <span className="text-neutral-400">Passing Marks:</span>{" "}
              {exam.passingMarks}
            </p>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <section className="md:min-h-[80vh]">
        <div className="md:grid md:grid-cols-11 gap-x-5 md:min-h-[60vh] px-2 md:px-4">
          {/* Left: Question Panel */}
          <section className="text-xl md:col-span-8 border border-neutral-700 bg-neutral-900/70 rounded-lg md:py-4 py-2 px-2 flex flex-col gap-y-8 shadow-sm shadow-indigo-300">
            <h2 className="font-semibold text-neutral-100 text-lg md:text-xl text-justify">
              Q.{currentQuestionIndex + 1} {currentQuestion?.text}
            </h2>

            <div className="flex flex-col gap-y-3 text-neutral-200 text-sm md:text-lg md:pl-2 px-3 md:px-0">
              {currentQuestion?.options.map((option, idx) => {
                const selected = getSelectedAnswer(currentQuestion._id);
                const isCorrect = idx === currentQuestion.correctAnswer;
                const isSelected = idx === selected;

                let bgColor =
                  "bg-neutral-800 border border-neutral-700 hover:border-indigo-500/30 transition-colors duration-300";
                if (isCorrect && isSelected)
                  bgColor = "bg-green-600/80 border-green-700";
                else if (isCorrect)
                  bgColor = "bg-green-500/70 border-green-700";
                else if (isSelected)
                  bgColor = "bg-red-500/70 border-red-700";

                return (
                  <div
                    key={idx}
                    className={`rounded-md px-4 py-2 shadow-sm ${bgColor}`}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            {currentQuestion?.explanation && (
              <p className="text-xs md:text-sm text-neutral-400 text-justify border-t border-neutral-700 pt-2">
                💡 Explanation: {currentQuestion.explanation}
              </p>
            )}
          </section>

          {/* Right: Question Tray for desktop */}
          <section className="hidden md:block md:min-h-[60vh] md:col-span-3 border border-neutral-700 bg-neutral-900/70 rounded-lg space-y-4 shadow-sm shadow-indigo-300">
            <div className="h-[5vh] flex justify-center items-center border-b border-neutral-700 py-2 text-neutral-300 font-medium">
              Question Status
            </div>
            <div className="max-h-[55vh] overflow-y-auto custom-scrollbar grid md:grid-cols-7 gap-2 px-2 w-full">
              {exam.questions.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`cursor-pointer w-8 h-8 rounded-md text-sm flex items-center justify-center font-medium text-white hover:scale-105 transition-transform duration-150 ${getQuestionStatusColor(
                    q
                  )}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </section>

          {/* Bottom Question Tray for Mobile */}
          <section className="block md:hidden fixed bottom-0 left-0 w-full bg-neutral-950/90 border-t border-neutral-800 px-3 py-3 overflow-x-auto custom-scrollbar backdrop-blur-sm">
            <div className="flex space-x-2">
              {exam.questions.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`min-w-[36px] h-8 rounded-md text-sm flex items-center justify-center font-medium text-white ${getQuestionStatusColor(
                    q
                  )}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
