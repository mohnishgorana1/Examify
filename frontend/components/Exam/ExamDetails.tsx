"use client";
import { URLs } from "@/constants/urls";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

function ExamDetails({ examId }: { examId: string }) {
  const router = useRouter();
  const { user, getValidAccessToken } = useAuth();
  const [examData, setExamData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = await getValidAccessToken();
        const { data } = await axios.get(
          `${URLs.backend}/api/v1/exam/full/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          setExamData(data);
          console.log("exam data", data);
        }
      } catch (error) {
        console.error("Error fetching exam:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExamDetails();
  }, [examId]);

  if (loading) return <p>Loading exam details...</p>;
  if (!examData?.exam) return <p>Exam not found.</p>;

  const { exam, isAttempted } = examData;
  const now = new Date();
  const scheduledTime = new Date(exam.scheduledAt);
  const hasStarted = now >= scheduledTime;

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 pt-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-orange-500 mb-1">
          {exam.title}
        </h1>
        <p className="text-neutral-300 text-md">{exam.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-300">
        <p>
          <strong>🕒 Duration:</strong> {exam.duration} minutes
        </p>
        <p>
          <strong>📅 Scheduled:</strong> {scheduledTime.toLocaleString()}
        </p>
        <p>
          <strong>❓ Total Questions:</strong> {exam.questions.length}
        </p>
        <p>
          <strong>✔️ Marks Per Questions:</strong> {exam.marksPerQuestion}
        </p>
        <p>
          <strong>📝 Total Marks:</strong> {exam.totalMarks ?? "NA"}
        </p>

        <p>
          <strong>✅ Passing Marks:</strong> {exam.passingMarks ?? "NA"}
        </p>
      </div>

      <div className="bg-neutral-900 border border-orange-400/20 rounded-xl p-5 shadow">
        <h2 className="text-xl font-bold text-orange-400 mb-2">
          📘 Instructions
        </h2>
        <ul className="list-disc list-inside text-sm space-y-1 text-neutral-300">
          <li>Read questions carefully before answering.</li>
          <li>Timer starts immediately once you begin.</li>
          <li>Do not reload or close the browser.</li>
          <li>All questions are mandatory unless stated.</li>
          <li>Use a stable internet connection.</li>
        </ul>
      </div>

      {!hasStarted ? (
        <p className="text-yellow-400 font-medium text-center md:text-xl md:underline">
          Exam has not started yet. Come back at the scheduled time.
        </p>
      ) : (
        <div className="w-full flex">
          <Button
            onClick={() => router.push(`/exam/${examId}/exam-room`)}
            className="cursor-pointer mx-auto bg-orange-500 hover:bg-orange-600 px-6 py-2 text-white text-lg rounded-lg shadow transition"
          >
            {isAttempted ? "View Result" : "Start Exam"}
          </Button>
        </div>
      )}

      {/* {!hasStarted ? (
        <div className="text-yellow-400 text-center text-lg">
          ⚠️ Exam hasn’t started yet. Please return at the scheduled time.
        </div>
      ) : !isAttempted ? (
        <div className="bg-neutral-900 p-6 rounded-xl border border-green-500/30 space-y-4">
          <h2 className="text-2xl text-green-400 font-semibold">
            ✅ You’ve already attempted this exam.
          </h2>
          <p className="text-white text-sm">
            <strong>Score:</strong> {score} / {exam.totalMarks ?? "NA"}
          </p>
          <p className="text-neutral-400 text-sm">
            <strong>Submitted:</strong>{" "}
            {new Date(submittedAt!).toLocaleString()}
          </p>

          <div className="grid gap-4">
            {exam.questions.map((q, idx) => {
              const userAnswer = userAnswers?.find(
                (a) => a.questionId === q._id
              );
              const isCorrect = userAnswer?.selectedOption === q.correctAnswer;

              return (
                <div
                  key={q._id}
                  className={`p-4 rounded-xl ${
                    isCorrect ? "bg-green-900/40" : "bg-red-900/40"
                  }`}
                >
                  <h3 className="text-white font-semibold text-lg">
                    {idx + 1}. {q.text}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {q.options.map((opt, i) => {
                      const isSelected = userAnswer?.selectedOption === i;
                      const isRight = q.correctAnswer === i;

                      return (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isRight
                                ? "bg-green-400"
                                : isSelected
                                ? "bg-yellow-400"
                                : "bg-neutral-500"
                            }`}
                          ></span>
                          <span
                            className={`${
                              isRight
                                ? "text-green-300"
                                : isSelected
                                ? "text-yellow-200"
                                : "text-neutral-300"
                            }`}
                          >
                            {opt}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : !showQuestions ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowQuestions(true)}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 text-white text-lg rounded-xl shadow transition"
          >
            🚀 Start Exam
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {exam.questions.map((q, idx) => (
            <div
              key={q._id}
              className="bg-neutral-900 p-5 rounded-xl border border-neutral-700"
            >
              <h3 className="text-white font-medium text-lg">
                {idx + 1}. {q.text}
              </h3>
              <ul className="mt-3 space-y-2">
                {q.options.map((opt, i) => (
                  <li key={i}>
                    <label className="flex items-center text-neutral-300 hover:text-white cursor-pointer">
                      <input
                        type="radio"
                        name={q._id}
                        value={i}
                        className="mr-3 accent-orange-500"
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-sm space-y-1">
      <p className="text-neutral-400">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  );
}

export default ExamDetails;
