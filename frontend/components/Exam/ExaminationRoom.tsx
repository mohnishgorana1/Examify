"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

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

type UserAnswer = {
  questionId: string;
  selectedOption: number;
};

export default function ExaminationRoom({ examId }: { examId: string }) {
  const { getValidAccessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [exam, setExam] = useState<Exam | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // exam dashboard states

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);

  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const [visitedQuestions, setVisitedQuestions] = useState<string[]>([]);

  const [score, setScore] = useState(null);

  const startExamSession = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = await getValidAccessToken();
      const res = await axios.post(
        `${URLs.backend}/api/v1/exam/start`,
        { examId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("res", res.data);

      const { exam, submission } = res.data;

      const startedAt = new Date(submission.startedAt);

      const now = new Date();

      const elapsedSeconds = Math.floor(
        (now.getTime() - startedAt.getTime()) / 1000
      );
      const remainingSeconds = exam.duration * 60 - elapsedSeconds;

      if (remainingSeconds <= 0) {
        handleSubmit(true); // auto-submit if time already over
        return;
      }

      setExam(exam);
      setSubmissionId(submission._id);

      setStartTime(startedAt);
      setTimeLeft(remainingSeconds);

      const firstQ = exam.questions[0];
      setCurrentQuestion(firstQ);
      setVisitedQuestions([firstQ._id]);
    } catch (error) {
      console.error("Failed to start/resume exam", error);
    } finally {
      setLoading(false);
    }
  };

  const visitQuestion = (question: Question, number: number) => {
    setCurrentQuestion(question);
    setCurrentQuestionNumber(number);
    setVisitedQuestions((prev) =>
      prev.includes(question._id) ? prev : [...prev, question._id]
    );
  };

  const handleOptionChange = (questionId: string, selectedOption: number) => {
    setAnswers((prev) => {
      const updated = prev.filter((ans) => ans.questionId !== questionId);
      updated.push({ questionId, selectedOption });
      return updated;
    });
  };

  const handleSubmit = async (isAutoSubmitted = false) => {
    if (!submissionId) return;

    setSubmitting(true);
    console.log("answers", answers);

    const timeTaken = startTime
      ? Math.floor((Date.now() - startTime.getTime()) / 1000)
      : 0;

    try {
      const token = await getValidAccessToken();
      const res = await axios.post(
        `${URLs.backend}/api/v1/exam/submit`,
        {
          examId: examId,
          answers,
          timeTaken,
          isAutoSubmitted,
          submissionId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("submision res", res);
      setScore(res.data.score);
    } catch (err) {
      console.error("Submit error", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    startExamSession();
  }, [examId]);

  useEffect(() => {
    if (!startTime || score !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit when time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, score]);

  if (loading)
    return (
      <main className="h-[80vh] flex items-center justify-center w-full">
        <p className="font-bold md:text-4xl text-2xl animate-pulse text-orange-500">
          Loading Exam Room...
        </p>
      </main>
    );

  if (score !== null) {
    return (
      <main className="min-h-[85vh] w-full text-white flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-8">
          <h1 className="text-2xl md:text-4xl font-bold">
            You have successfully submitted exam!
          </h1>

          <div className="flex gap-x-5 justify-between">
            <Link href={`/exam/${examId}/view-result`}>
              <button className="w-56 px-3 py-1 rounded-xl cursor-pointer bg-transparent  border border-orange-500 text-orange-500 hover:text-orange-600 hover:border-orange-600/85 duration-500 ">
                View Result
              </button>
            </Link>

            <Link href={`/exam/${examId}/view-result`}>
              <button className="w-56 px-3 py-1 rounded-xl cursor-pointer bg-transparent  border border-orange-500 text-orange-500 hover:text-orange-600 hover:border-orange-600/85 duration-500 ">
                Visit Dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!exam || !currentQuestion)
    return <div className="text-white">No exam</div>;

  const totalQuestions = exam?.questions.length;

  return (
    <div className="md:space-y-6 space-y-3 relative min-h-screen">
      <header className="py-2 pl-2 z-50 sticky grid grid-cols-11 gap-x-5 items-center md:justify-between justify-center w-full border border-neutral-600 rounded-xl">
        <h1 className="col-span-11 md:col-span-8 text-2xl font-bold text-center md:text-start text-orange-500 w-full 
        flex items-center justify-center md:items-start md:justify-normal">
          {exam?.title}
        </h1>
        <div className="col-span-11 md:col-span-3 w-full flex items-center justify-center">
          <h1 className="w-[60%] text-[15px]  text-white animate-pulse font-bold text-center rounded-lg">
            Time Remaining:{" "}
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(timeLeft % 60).toString().padStart(2, "0")}
          </h1>
        </div>
      </header>

      <div className="md:min-h-[80vh] flex flex-col gap-y-6 md:gap-y-2 ">
        <div className="grid md:grid-cols-11 gap-x-5 md:min-h-[60vh]">
          {/* question */}
          <section className="md:col-span-8 border border-neutral-600 rounded-xl md:py-4 py-2 px-2 flex flex-col md:gap-y-8 gap-y-4">
            <h2 className="font-semibold text-xl md:text-xl text-white">
              Q.{currentQuestionNumber} {currentQuestion.text}{" "}
              {/* <span className="text-xs ">{currentQuestion._id}</span> */}
            </h2>
            {/* options */}
            <RadioGroup
              value={
                answers
                  .find((a) => a.questionId === currentQuestion._id)
                  ?.selectedOption.toString() ?? ""
              }
              onValueChange={(val) => {
                const selectedOption = parseInt(val);
                const existingAnswer = answers.find(
                  (a) => a.questionId === currentQuestion._id
                );

                if (existingAnswer?.selectedOption === selectedOption) {
                  // Deselect if same option is clicked again
                  setAnswers((prev) =>
                    prev.filter((a) => a.questionId !== currentQuestion._id)
                  );
                } else {
                  handleOptionChange(currentQuestion._id, selectedOption);
                }
              }}
            >
              <div className="flex flex-col gap-y-3 md:gap-y-3 text-white text-lg pl-2">
                {currentQuestion.options &&
                  currentQuestion.options.map((option: any, optionIdx: any) => (
                    <div
                      className="flex items-center space-x-2"
                      key={optionIdx}
                    >
                      <RadioGroupItem
                        value={optionIdx.toString()}
                        id={`option-${optionIdx}`}
                      />
                      <Label
                        className="text-md md:text-lg"
                        htmlFor={`option-${optionIdx}`}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
              </div>
            </RadioGroup>
          </section>
          {/*DESKTOP:  question-status/tray*/}
          <section className="hidden md:block md:min-h-[60vh] md:col-span-3 border border-neutral-600 rounded-xl">
            <div className="h-[5vh] flex gap-8 items-center justify-center my-2 pb-1 border-b">
              <span className="flex items-center gap-1">
                <button className="bg-red-500 text-black p-1 w-4 h-4 rounded-md"></button>
                <span className="text-white">Not Saved</span>
              </span>
              <span className="flex items-center gap-1">
                <button className="bg-green-500 text-black p-1 w-4 h-4 rounded-md"></button>
                <span className="text-white">Saved</span>
              </span>
            </div>
            <div className="max-h-[55vh] overflow-y-auto custom-scrollbar grid grid-cols-5 lg:grid-cols-7 gap-4 md:gap-2 px-2 w-full">
              {exam &&
                exam?.questions &&
                exam.questions.length !== 0 &&
                exam.questions.map((question: any, idx) => {
                  // const isCurrent = currentQuestion._id === question._id;
                  const isAnswered = answers.some(
                    (a) => a.questionId === question._id
                  );
                  const isSeen = visitedQuestions.includes(question._id);
                  let bgColor = "bg-blue-50 text-black"; //default
                  if (isAnswered) {
                    bgColor = "bg-green-500 text-white";
                  } else if (isSeen) {
                    bgColor = "bg-red-500 text-white";
                  }
                  return (
                    <button
                      onClick={() => visitQuestion(question, idx + 1)}
                      className={`col-span-1 cursor-pointer font-medium text-sm  w-8 h-8 rounded-md flex items-center justify-center ${bgColor}`}
                      key={idx}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
            </div>
          </section>
        </div>
        {/* control */}
        <div className="my-2 md:h-[10vh] md:border md:border-neutral-600 rounded-xl grid md:grid-cols-11 gap-x-5 items-center">
          <div className="md:col-span-8 px-2 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center md:flex-row gap-x-2 md:gap-x-3 lg:gap-x-5 justify-evenly gap-y-3">
            <Button
              className="h-8 w-[80vw] md:w-32 lg:w-44 text-sm  bg-blue-500 hover:bg-blue-500/75"
              onClick={() => {
                // If selected, it's already saved via onValueChange.
                // But if not selected, just move on (no save).
                if (currentQuestionNumber < totalQuestions) {
                  const nextQuestion = exam.questions[currentQuestionNumber];
                  visitQuestion(nextQuestion, currentQuestionNumber + 1);
                } else {
                  alert("You are on the last question");
                }
              }}
            >
              Save
            </Button>
            <Button
              className="h-8 w-[80vw] md:w-32 lg:w-44 text-sm  bg-red-500 hover:bg-red-500/75"
              onClick={() => {
                if (currentQuestionNumber < totalQuestions) {
                  const nextQuestion = exam.questions[currentQuestionNumber]; // 0-indexed
                  visitQuestion(nextQuestion, currentQuestionNumber + 1);
                } else {
                  alert("You are on the last question.");
                }
              }}
            >
              Next
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setAnswers((prev) =>
                  prev.filter((a) => a.questionId !== currentQuestion._id)
                )
              }
              className="h-8 w-[80vw] md:w-32 lg:w-44 text-sm cursor-pointer "
            >
              Clear
            </Button>
          </div>
          <div className="hidden md:col-span-3 w-full md:flex items-center justify-center">
            <Button
              onClick={() => handleSubmit(false)}
              disabled={submitting || score !== null}
              className="w-52 bg-green-600 hover:bg-green-600/65 cursor-pointer"
            >
              Submit
            </Button>
          </div>
        </div>

        {/*MOBILE:  question-status/tray*/}
        <section className="mt-2 block md:hidden md:min-h-[60vh] md:col-span-3 border border-neutral-600 rounded-xl">
          <div className="h-[5vh] flex gap-8 items-center justify-center my-2 pb-1 border-b">
            <span className="flex items-center gap-2">
              <button className="bg-red-500 text-black p-1 w-4 h-4 rounded-md"></button>
              <span className="text-white">Not Saved</span>
            </span>
            <span className="flex items-center gap-2">
              <button className="bg-green-500 text-black p-1 w-4 h-4 rounded-md"></button>
              <span className="text-white">Saved</span>
            </span>
          </div>
          <div className="max-h-[55vh] overflow-x-auto custom-scrollbar flex items-center gap-x-5 px-3 pt-4 pb-5 w-full">
            {exam &&
              exam?.questions &&
              exam.questions.length !== 0 &&
              exam.questions.map((question: any, idx) => {
                // const isCurrent = currentQuestion._id === question._id;
                const isAnswered = answers.some(
                  (a) => a.questionId === question._id
                );
                const isSeen = visitedQuestions.includes(question._id);

                let bgColor = "bg-blue-50 text-black"; //default
                if (isAnswered) {
                  bgColor = "bg-green-500 text-white";
                } else if (isSeen) {
                  bgColor = "bg-red-500 text-white";
                }
                return (
                  <button
                    onClick={() => visitQuestion(question, idx + 1)}
                    className={`cursor-pointer font-medium text-sm  min-w-8 min-h-8 rounded-md flex items-center justify-center ${bgColor}`}
                    key={idx}
                  >
                    {idx + 1}
                  </button>
                );
              })}
          </div>
        </section>
        {/* SUBMIT BTN FOR MOBILE */}
        <div className="w-full md:hidden mt-2 items-center justify-center">
          <Button
            onClick={() => handleSubmit(false)}
            disabled={submitting || score !== null}
            className="w-full bg-green-600 hover:bg-green-600/65 cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
