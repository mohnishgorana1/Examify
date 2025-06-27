import React, { useEffect, useState } from "react";
import { URLs } from "@/constants/urls";
import axios from "axios";
import { formatDateToLongString } from "@/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { getValidAccessToken } from "@/utils/getValidAccessToken";

function MyExams() {
  const [myCreatedExams, setMyCreatedExams] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const accessToken = await getValidAccessToken();
        const { data } = await axios.get(
          `${URLs.backend}/api/v1/exam/my-created-exams`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (data.success) {
          setMyCreatedExams(data.exams);
          console.log("created exams", data.exams);
        } else {
          console.log("Failed to get exams");
        }
      } catch (err) {
        console.error("Error fetching exams", err);
      }
    };

    fetch();
  }, []);

  return (
    <main className="w-full h-auto md:grid md:grid-cols-3 md:px-3">
      <section className="w-full h-full md:col-span-1 hidden md:flex flex-col justify-start pl-2 font-bold py-16 text-8xl gy-5">
        <span className="bg-gradient-to-br from-25% from-orange-300 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          YOUR
        </span>
        <span className="bg-gradient-to-br from-25% from-orange-300 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          CREATED
        </span>
        <span className="bg-gradient-to-br from-25% from-orange-300 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          EXAMS
        </span>
      </section>
      <section className="md:pr-1 md:pl-3 md:col-span-2 flex flex-col gap-y-2 md:py-4">
        <h1 className="font-bold text-3xl self-center md:hidden bg-gradient-to-br from-25% from-orange-400 via-55% via-orange-200 to-90% to-neutral-800 bg-clip-text text-transparent">
          Your Created Exam
        </h1>

        {/* list of created exams */}
        <div className="flex flex-col gap-4">
          {!myCreatedExams ? (
            <p className="text-center text-white">Loading your exams...</p>
          ) : myCreatedExams.length === 0 ? (
            <p className="text-center text-white">No exams found.</p>
          ) : (
            myCreatedExams.map((exam: any) => (
              <div
                key={exam._id}
                className="w-full p-4 bg-neutral-900 rounded-lg shadow-sm hover:shadow-neutral-500 hover:shadow-md transition duration-500"
              >
                <div className="w-full space-y-3 relative">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-orange-500">
                      {exam.title}
                    </h2>
                    {/* Description */}
                    {exam.description && (
                      <p className=" text-sm text-white mb-1">
                        {exam.description}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex items-baseline justify-between">
                    <div className="">
                      <p className="text-sm text-white opacity-85">
                        Duration: {exam.duration} mins
                      </p>
                      <p className="text-sm text-white opacity-85">
                        Total Questions: {exam.questions?.length || 0}
                      </p>
                      <p className="text-xs text-white opacity-45 mt-2 md:mt-4">
                        Created At:{" "}
                        <span className="text-xs">
                          {formatDateToLongString(exam.createdAt)}
                        </span>
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/instructor/update-exam/${exam._id}`}
                      className="absolute right-0 bottom-1 px-2 py-1 md:p-2 bg-transparent border rounded-xl text-orange-500 border-orange-500 hover:bg-orange-500 duration-300 hover:text-white cursor-pointer"
                    >
                      Update Exam
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default MyExams;
