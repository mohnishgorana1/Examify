"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

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
  const { getValidAccessToken } = useAuth();

  const [exam, setExam] = useState<Exam | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = exam?.questions[currentQuestionIndex];

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = await getValidAccessToken();
        const res = await axios.get(
          `${URLs.backend}/api/v1/exam/result/${examId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExam(res.data.exam);
        setSubmission(res.data.submission);
      } catch (err) {
        console.error("Error fetching result", err);
      }
    };

    if (examId) fetchResult();
  }, [examId]);

  const getSelectedAnswer = (questionId: string) =>
    submission?.answers.find((a) => a.questionId === questionId)
      ?.selectedOption;

  const getQuestionStatusColor = (q: Question) => {
    const selected = getSelectedAnswer(q._id);
    if (selected === undefined) return "bg-gray-400"; // Not answered
    return selected === q.correctAnswer ? "bg-green-400" : "bg-red-400";
  };

  if (!exam || !submission) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading Result...
      </div>
    );
  }

  const passingMarks = exam.passingMarks;

  return (
    <div className="space-y-6 relative min-h-screen pb-20">
      <nav className="sticky top-0 z-50 md:grid md:grid-cols-11 flex items-center justify-between md:gap-x-5 w-full px-2 py-4  md:p-4 bg-neutral-900 ">
        <Link
          href="/"
          className=" md:col-span-8 flex items-center gap-1 text-2xl font-bold tracking-tight text-orange-500/80 hover:text-orange-500 transition"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="font-[Playfair_Display]">Examify</span>
        </Link>
        <div className="md:col-span-3 flex items-center md:justify-end">
          <Link
            href={"/dashboard/student"}
            className="bg-transparent border border-orange-500 text-orange-500 py-1 px-4 rounded-sm text-sm"
          >
            Visit Dashboard
          </Link>
        </div>
      </nav>

      <header className="text-white md:grid md:grid-cols-11 md:px-4 items-center flex flex-col gap-y-4">
        <div className="w-full md:col-span-8 flex gap-y-2 items-center justify-between px-2 md:px-0">
          <h1 className="text-xl md:text-3xl font-bold">{exam.title}</h1>
          <span
            className={`${
              submission.score >= passingMarks! ? "bg-green-600" : "bg-red-600"
            } px-4 py-1 rounded-3xl text-xs md:text-sm w-32 text-center`}
          >
            {submission.score >= passingMarks! ? "Passed" : "Failed"}
          </span>
        </div>
        <div className="md:col-span-3 font-bold text-white text-sm md:text-md w-full  px-3 ">
          <div className="bg-neutral-800 px-4 py-2 rounded-3xl flex md:items-center justify-evenly">
            <p>Score: {submission.score}</p>
            <p>Passing Marks: {exam.passingMarks}</p>
          </div>
        </div>
      </header>

      <section className="md:min-h-[80vh]">
        <div className="md:grid md:grid-cols-11 gap-x-5 md:min-h-[60vh] px-2 md:px-4">
          {/* Left: Question Panel */}
          <section className="text-xl md:col-span-8 border border-neutral-600 rounded-md md:py-4 py-2 px-2 flex flex-col gap-y-8">
            <h2 className="font-semibold text-white text-lg md:text-xl text-justify">
              Q.{currentQuestionIndex + 1} {currentQuestion?.text}
            </h2>

            <div className="flex flex-col gap-y-3 text-white text-sm md:text-lg md:pl-2 px-3 md:px-0">
              {currentQuestion?.options.map((option, idx) => {
                const selected = getSelectedAnswer(currentQuestion._id);
                const isCorrect = idx === currentQuestion.correctAnswer;
                const isSelected = idx === selected;

                let bgColor = "bg-zinc-800 border border-zinc-600";
                if (isCorrect && isSelected)
                  bgColor = "bg-green-600 border-green-800";
                else if (isCorrect) bgColor = "bg-green-400 border-green-700";
                else if (isSelected) bgColor = "bg-red-400 border-red-700";

                return (
                  <div key={idx} className={`rounded-md px-4 py-2 ${bgColor}`}>
                    {option}
                  </div>
                );
              })}
            </div>

            {currentQuestion?.explanation && (
              <p className="text-xs md:text-sm text-neutral-300 text-justify">
                Explanation: {currentQuestion.explanation}
              </p>
            )}
          </section>

          {/* Right: Question Tray for desktop */}
          <section className="hidden md:block md:min-h-[60vh] md:col-span-3 border border-neutral-600 rounded-md space-y-4">
            <div className="h-[5vh] flex justify-center items-center border-b py-2 text-white">
              Question Status
            </div>
            <div className="max-h-[55vh] overflow-y-auto custom-scrollbar grid md:grid-cols-7 gap-2 px-2 w-full">
              {exam.questions.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`cursor-pointer w-8 h-8 rounded-md text-sm flex items-center justify-center font-medium text-white ${getQuestionStatusColor(
                    q
                  )}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </section>

          {/* Bottom Question Tray for Mobile */}
          <section className="block md:hidden fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-200 px-3 py-3 overflow-x-auto custom-scrollbar ">
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
