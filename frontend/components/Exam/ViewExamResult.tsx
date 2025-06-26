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
  const totalQuestions = exam?.questions.length || 0;

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
    <div className="space-y-6 relative min-h-screen">
      <header className="sticky top-0 z-50 grid grid-cols-11 gap-x-5 w-full p-4 bg-neutral-900 items-center justify-between">
        <Link
          href="/"
          className="col-span-8 flex items-center gap-1 text-2xl font-bold tracking-tight text-orange-500/80 hover:text-orange-500 transition"
        >
          <GraduationCap size={24} className="mt-1" />
          <span className="font-[Playfair_Display]">Examify</span>
        </Link>
        <div className="col-span-3 flex items-center justify-end">
          <Link
            href={"/dashboard/student"}
            className="bg-transparent border border-orange-500 text-orange-500 py-1 px-4 rounded-xl "
          >
            Go To Dashboard
          </Link>
        </div>
      </header>

      <section className=" text-white grid grid-cols-11 px-4 items-center">
        <div className="col-span-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Exam Title: {exam.title}</h1>
          <span
            className={`${
              submission.score >= passingMarks! ? "bg-green-600" : "bg-red-600"
            } px-4 py-1 rounded-3xl text-sm`}
          >
            {submission.score >= passingMarks! ? "Passed" : "Failed"}
          </span>
        </div>
        <span className="col-span-3 font-bold  text-white text-xl w-full flex justify-evenly ">
          <p>Score: {submission.score}</p>
          <p>Passing Marks: {exam.passingMarks}</p>
        </span>
      </section>

      <div className="md:min-h-[80vh] flex flex-col gap-y-2">
        <div className="grid grid-cols-11 gap-x-5 md:min-h-[60vh]">
          {/* Left: Question Panel */}
          <section className="text-xl col-span-8 border md:py-4 py-2 px-2 flex flex-col gap-y-8">
            <h2 className="font-semibold text-white">
              Q.{currentQuestionIndex + 1} {currentQuestion?.text}
            </h2>

            <div className="flex flex-col gap-y-3 text-white text-lg pl-2">
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
              <p className="text-sm text-gray-400">
                Explanation: {currentQuestion.explanation}
              </p>
            )}
          </section>

          {/* Right: Question Tray */}
          <section className="md:min-h-[60vh] col-span-3 border space-y-4">
            <div className="h-[5vh] flex justify-center items-center border-b py-2 text-white">
              Question Status
            </div>
            <div className="max-h-[55vh] overflow-y-auto custom-scrollbar grid md:grid-cols-7 gap-2 px-2 w-full">
              {exam.questions.map((q, idx) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-md text-sm flex items-center justify-center font-medium text-white ${getQuestionStatusColor(
                    q
                  )}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
