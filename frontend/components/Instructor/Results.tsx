"use client";

import { URLs } from "@/constants/urls";
import { getValidAccessToken } from "@/utils/getValidAccessToken";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import Loader from "../Loader";

function Results() {
  const [isFetchingResults, setIsFetchingResults] = useState(true);
  const [examResults, setExamResults] = useState<any>(null);

  const fetchResults = async () => {
    const token = await getValidAccessToken();
    setIsFetchingResults(true);
    try {
      const res = await axios.get(`${URLs.backend}/api/v1/exam/get-results`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Res", res.data);
      console.log("exa,reasults", res.data.examResults);

      if (res.data.success) {
        setExamResults(res.data?.examResults);
        if (res.data.examResults === undefined) {
          toast.error("Oops no student has attempt any exam taken by you!");
          return;
        }
        toast.success("✅ Results fetched Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error fetching results", error);
      toast.error("❌ Error fetching results");
    } finally {
      setIsFetchingResults(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  if (isFetchingResults) {
    return (
      <section className="w-full h-[60vh] flex flex-col gap-y-3 items-center justify-center">
        <Loader />
        <h1 className="text-white">Fetching Results</h1>
      </section>
    );
  }

  return (
    <main className="w-[95vw] md:w-[75vw] mx-auto flex items-center justify-center">
      <div className="w-full md:grid md:grid-cols-3 flex flex-col md:gap-x-4 lg:gap-x-8 gap-y-6 md:gap-y-4 lg:gap-y-6 py-4 md:py-6 px-4">
        {examResults && examResults.length > 0 ? (
          examResults.map((exam: any) => {
            return (
              <div
                className="flex flex-col items-center md:items-start justify-between gap-y-5 bg-neutral-900 px-2 md:px-4 lg:px-8 py-2 md:py-4 lg:py-6 rounded-2xl shadow-sm shadow-neutral-700 "
                key={exam.examId}
              >
                <article className="space-y-2">
                  <h1 className="mb-1 text-lg text-orange-500 font-semibold ">
                    {exam.title}
                  </h1>
                  <p className="text-sm text-neutral-400 font-medium">
                    {exam.description}
                  </p>
                  <p className="text-sm text-neutral-400 font-medium">
                    Total Marks : {exam.totalMarks}
                  </p>
                  <p className="text-sm text-neutral-400 font-medium">
                    Passing Marks : {exam.passingMarks}
                  </p>
                </article>

                <Link
                  href={`/dashboard/instructor/view-submissions/${exam.examId}`}
                >
                  <Button
                    disabled={exam.submissions.length === 0}
                    className="cursor-pointer text-sm py-2 px-4 bg-black/25 duration-200 ease-linear  text-orange-500 hover:bg-black font-semibold rounded-xl"
                  >
                    {exam.submissions.length === 0 ? (
                      <span>No Submissions</span>
                    ) : (
                      <span>
                        View All Submission ({exam.submissions.length})
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="w-[90vw] md:w-[70vw] flex items-center justify-center text-white">
            <span className="animate-pulse text-6xl md:mt-8">
              No Exam Found
            </span>
          </p>
        )}
      </div>
    </main>
  );
}

export default Results;
