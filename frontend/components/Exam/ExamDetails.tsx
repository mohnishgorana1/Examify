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
    <div className="max-w-5xl mx-auto space-y-8 px-2 md:px-4 pt-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-orange-500 mb-1">
          {exam.title}
        </h1>
        <p className="text-neutral-300 text-md">{exam.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 md:gap-4 text-sm text-neutral-300">
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
          {isAttempted ? (
            <Button
              onClick={() => router.push(`/exam/${examId}/view-result`)}
              className="cursor-pointer mx-auto bg-orange-500 hover:bg-orange-600 px-6 py-2 text-white text-lg rounded-lg shadow transition"
            >
              View Result
            </Button>
          ) : (
            <Button
              onClick={() => router.push(`/exam/${examId}/exam-room`)}
              className="cursor-pointer mx-auto bg-orange-500 hover:bg-orange-600 px-6 py-2 text-white text-lg rounded-lg shadow transition"
            >
              Start Exam
            </Button>
          )}
        </div>
      )}
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
