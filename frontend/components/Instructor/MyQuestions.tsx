import React, { useEffect, useState } from "react";
import { URLs } from "@/constants/urls";

import axios from "axios";
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
    <main className="w-full h-auto ">
      
      <section className="flex flex-col gap-y-8 md:py-4">
        <h1 className="font-bold text-2xl self-center bg-gradient-to-br from-25% from-orange-500 via-55% via-neutral-600 to-70% to-neutral-500 bg-clip-text text-transparent ">
          Your Created Questions
        </h1>

        {/* list of created questions */}
        <div className="flex flex-col gap-5">
          {myCreatedQuestions && myCreatedQuestions.length === 0 ? (
            <p className="text-center text-white text-2xl md:text-4xl mt-8">No questions found.</p>
          ) : (
            myCreatedQuestions && myCreatedQuestions.map((q: any, idx: number) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={q._id}
                  className={`${isExpanded && "shadow-neutral-500 shadow-lg"}  rounded-lg shadow-sm p-4 bg-neutral-800 transition-all duration-300`}
                >
                  {/* Header */}
                  <div
                    className="md:grid md:grid-cols-12 gap-x-4 cursor-pointer items-center"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  >
                    <h2 className="font-semibold text-base col-span-11 text-white">
                      Q{idx + 1}. {q.text}
                    </h2>
                    <span className="text-xs text-orange-500">
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
                            className={`p-2 text-sm border rounded-md ${
                              q.correctAnswer === i
                                ? "bg-neutral-900 text-white border-orange-400"
                                : "border-gray-300 text-neutral-200"
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="text-sm text-neutral-200">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}

                      <div className="text-xs text-neutral-400">
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
