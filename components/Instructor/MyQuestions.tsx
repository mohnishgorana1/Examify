import React, { useEffect, useState } from "react";

import axios from "axios";
import { formatDateToLongString } from "@/lib/utils";
import toast from "react-hot-toast";
import { useAppUser } from "@/contexts/UserContext";
import { TextShimmerWave } from "../ui/text-shimmer-wave";

function MyQuestions() {
  const { appUser } = useAppUser();
  const appUserId = appUser?._id;
  const [myCreatedQuestions, setMyCreatedQuestions] = useState<any>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true);

  const fetchMyQuestions = async () => {
    if (!appUser?._id) return;
    setIsFetchingQuestions(true);
    const instructorId = appUser?._id;

    try {
      const { data } = await axios.get(
        `/api/exam/instructor/questions?instructorId=${appUser._id}`
      );

      if (data.success) {
        // toast.success("Question fetched successfully!");
        setMyCreatedQuestions(data.data);
      } else {
        toast.error("Failed to fetch question.");
      }
    } catch (error) {
      setIsFetchingQuestions(false);
    } finally {
      setIsFetchingQuestions(false);
    }
  };

  useEffect(() => {
    fetchMyQuestions();
  }, [appUserId]);

  if (isFetchingQuestions) {
    return (
      <main className="w-full border h-[90vh] flex items-center my-auto justify-center">
        <h1 className="text-white text-lg md:text-2xl ">
          <TextShimmerWave className="font-mono text-lg md:text-2xl lg:text-3xl" duration={1}>
            Fetching Questions...
          </TextShimmerWave>
        </h1>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-neutral-950 px-4 py-10">
      <section className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-4">
          Your Created Questions
        </h1>

        {myCreatedQuestions && myCreatedQuestions.length === 0 ? (
          <p className="text-center text-white text-xl mt-8">
            No questions found.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {myCreatedQuestions &&
              myCreatedQuestions.map((q, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div
                    key={q._id}
                    className={`rounded-lg px-4 py-2 bg-neutral-800 shadow-md transition-all duration-300 ${
                      isExpanded
                        ? "shadow-indigo-500/50"
                        : "hover:shadow-indigo-400/40"
                    }`}
                  >
                    {/* Header */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    >
                      <h2 className="text-white font-semibold text-lg md:text-xl">
                        Q{idx + 1}. {q.text}
                      </h2>
                      <span className="text-indigo-300 text-xs md:text-sm">
                        {isExpanded ? "Hide" : "Show"} details
                      </span>
                    </div>

                    {/* Expanded Section */}
                    {isExpanded && (
                      <div className="mt-4 space-y-3">
                        <div className="space-y-2">
                          {q.options.map((opt: string, i: number) => (
                            <div
                              key={i}
                              className={`p-2 text-xs md:text-sm border rounded-md ${
                                q.correctAnswer === i
                                  ? "border-green-700 text-green-700  font-semibold"
                                  : "border-gray-700 text-neutral-200"
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <p className="text-neutral-300 text-xs md:text-sm">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        )}

                        <p className="text-[11px] text-neutral-400">
                          Created: {formatDateToLongString(q.createdAt)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyQuestions;
