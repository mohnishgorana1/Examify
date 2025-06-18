import React, { useEffect, useState } from "react";
import { URLs } from "@/constants/urls";

import axios from "@/lib/axios";
import { formatDateToLongString } from "@/utils";

function MyQuestions() {
  const [token, setToken] = useState("");
  const [myCreatedQuestions, setMyCreatedQuestions] = useState<any>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("No token ");
      return;
    }

    console.log("Access token found:", accessToken);
    setToken(accessToken);

    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `${URLs.backend}/api/v1/exam/my-created-questions`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (data.success) {
          setMyCreatedQuestions(data.questions);
          console.log("created questions", data.questions);
        } else {
          console.log("Failed to get questions");
        }
      } catch (err) {
        console.error("Error fetching questions", err);
      }
    };

    fetch();
  }, []);

  return (
    <main className="w-full h-auto">
      
      <section className="flex flex-col gap-y-2 md:py-4">
        <h1 className="font-bold text-2xl self-center bg-gradient-to-tl from-25% from-emerald-300 via-55% via-emerald-700 to-70% to-emerald-800 bg-clip-text text-transparent">
          Your Created Questions
        </h1>

        {/* list of created questions */}
        <div className="flex flex-col gap-3">
          {myCreatedQuestions && myCreatedQuestions.length === 0 ? (
            <p className="text-center text-gray-500">No questions found.</p>
          ) : (
            myCreatedQuestions && myCreatedQuestions.map((q: any, idx: number) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={q._id}
                  className={`${isExpanded && "shadow-gray-700 shadow-md"} border rounded-lg shadow-sm p-4 bg-white transition-all duration-300`}
                >
                  {/* Header */}
                  <div
                    className="md:grid md:grid-cols-12 gap-x-4 cursor-pointer"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  >
                    <h2 className="font-semibold text-base col-span-11">
                      Q{idx + 1}. {q.text}
                    </h2>
                    <span className="text-xs text-emerald-600">
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
                            className={`p-1 text-sm border rounded ${
                              q.correctAnswer === i
                                ? "bg-emerald-100 border-emerald-400"
                                : "border-gray-300"
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="text-sm text-gray-600">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        Created: {formatDateToLongString(q.createdAt)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default MyQuestions;
