"use client";
import { URLs } from "@/constants/urls";
import { getValidAccessToken } from "@/utils/getValidAccessToken";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function ViewSubmissions({ examId }: { examId: string }) {
  const [isFetchingSubmissions, setIsFetchingSubmissions] = useState(true);
  const [allSubmissions, setAllSubmissions] = useState<any>(null);
  const [exam, setExam] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const fetchAllSubmissions = async () => {
    const token = await getValidAccessToken();

    try {
      const res = await axios.get(
        `${URLs.backend}/api/v1/exam/get-submissions/${examId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Res", res.data);
      if (res.data.success) {
        toast.success("Exam Results fetched Successfully");
        setAllSubmissions(res.data.submissions);
        setExam(res.data.exam);
      }
    } catch (error) {
      console.log("Error fetching Exam Results", error);

      toast.error("Error fetching Exam Results");
    } finally {
      setIsFetchingSubmissions(false);
    }
  };
  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  if (isFetchingSubmissions) {
    return (
      <section className="w-full h-[95vh] md:h-auto md:max-h-[95vh] flex items-center justify-center overflow-hidden">
        <Loader />
      </section>
    );
  }

  const sortedSubmissions = [...allSubmissions].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Higher score first
    } else {
      return a.timeTaken - b.timeTaken; // Lower time first
    }
  });

  return (
    <section className="flex flex-col gap-y-4 md:gap-y-8 py-4">
      {exam && (
        <header className="self-center flex flex-col gap-y-3 justify-center items-center">
          <h1 className="text-neutral-400 brightness-150  font-bold md:text-5xl text-xl uppercase ">
            View All Submissions
          </h1>
          <div className="w-[65vw] sm:w-[35vw] md:w-[30vw] lg:w-[20vw] py-1 px-2 rounded-xl text-xs md:text-sm border ">
            <article className="relative flex items-center gap-x-1 px-1">
              <span className="bg-orange-500 rounded-full h-2 w-2 mr-[1px] text-center" />
              <p className="font-semibold text-neutral-400">
                Total Questions:{" "}
              </p>
              <p className="font-bold text-white absolute right-3">
                {exam.questions.length}
              </p>
            </article>
            <article className="relative flex items-center gap-x-1 px-1 ">
              <span className="bg-orange-500 rounded-full h-2 w-2 mr-[1px] text-center" />
              <p className="font-semibold text-neutral-400">
                Marks Per Question:{" "}
              </p>
              <p className="font-bold text-white absolute right-3">
                {exam.marksPerQuestion}
              </p>
            </article>
            <article className="relative flex items-center gap-x-1 px-1">
              <span className="bg-orange-500 rounded-full h-2 w-2 mr-[1px] text-center" />
              <p className="font-semibold text-neutral-400">Total Marks: </p>
              <p className="font-bold text-white absolute right-3">
                {exam.totalMarks}
              </p>
            </article>
            <article className="relative flex items-center gap-x-1 px-1">
              <span className="bg-orange-500 rounded-full h-2 w-2 mr-[1px] text-center" />
              <p className="font-semibold text-neutral-400">Passing Marks: </p>
              <p className="font-bold text-white absolute right-3">
                {exam.passingMarks}
              </p>
            </article>
          </div>
        </header>
      )}
      <section className="md:mx-auto  md:max-w-[85vw]">
        {sortedSubmissions && sortedSubmissions.length > 0 ? (
          sortedSubmissions.map((submission: any, idx) => {
            const isPass = submission.score >= exam.passingMarks;
            return (
              <div
                key={idx}
                className="w-[95vw] md:w-[80vw] bg-neutral-800 py-2 px-3 rounded-xl text-white "
              >
                <div className="flex md:items-center gap-x-2 md:gap-x-3 lg:gap-x-6">
                  <p className="text-orange-500 font-semibold md:w-16 text-lg">
                    #{idx + 1}
                  </p>
                  <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between ">
                    <p className="font-bold mb-2 md:mb-0">
                      Name: {submission.studentInfo.name}
                    </p>
                    <span className=" flex gap-x-8 md:gap-x-16 items-center w-full md:w-auto">
                      <p>Score: {submission.score}</p>
                      <p className="">
                        <span>Result: </span>
                        <span
                          className={
                            isPass
                              ? "text-green-500 font-medium"
                              : "text-red-500 font-medium"
                          }
                        >
                          {isPass ? "Pass" : "Fail"}
                        </span>
                      </p>
                    </span>
                    <span className="flex gap-x-8 md:gap-x-16 items-center w-full md:w-auto">
                      <p>Time: {submission.timeTaken}s</p>
                      <p>Attempt: {submission.attemptNumber}</p>
                    </span>
                    <Popover>
                      <PopoverTrigger className="font-semibold mt-2 md:mt-0 bg-orange-500 py-1 px-4 rounded-2xl text-sm hover:cursor-pointer">
                        Show More Details
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        side="bottom"
                        className="bg-neutral-900 text-white border-neutral-500"
                        hideWhenDetached
                      >
                        <div className="text-xs md:text-sm">
                          <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {submission.studentInfo.email}
                          </p>
                          <p>
                            <span className="font-semibold">Phone:</span>{" "}
                            {submission.studentInfo.phone}
                          </p>
                          <p>
                            <span className="font-semibold">Started:</span>{" "}
                            {new Date(submission.startedAt).toLocaleString()}
                          </p>
                          <p>
                            <span className="font-semibold">Submitted:</span>{" "}
                            {new Date(submission.submittedAt).toLocaleString()}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Auto Submitted:
                            </span>{" "}
                            {submission.isAutoSubmitted ? "Yes" : "No"}
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="w-[90vw] md:w-[70vw] flex items-center justify-center text-white">
            <span className="animate-pulse text-6xl md:mt-8">
              No Submission Found
            </span>
          </p>
        )}
      </section>
    </section>
  );
}

const Loader: React.FC = () => {
  return (
    <div className="relative flex space-x-2">
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite]"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.4s]"></div>

      <style jsx>{`
        @keyframes slideDot {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(10px);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewSubmissions;
