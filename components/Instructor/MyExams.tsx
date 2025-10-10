import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDateToLongString } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { useAppUser } from "@/contexts/UserContext";

function MyExams() {
  const { appUser } = useAppUser();
  const appUserId = appUser?._id;
  const [myCreatedExams, setMyCreatedExams] = useState<any>();
  const [isFetchingExams, setIsFetchingExams] = useState(false);

  const fetchExams = async () => {
    if (!appUserId) return;
    setIsFetchingExams(true);
    try {
      const { data } = await axios.get(
        `/api/exam/instructor/exams?instructorId=${appUserId}`
      );

      if (data.success) {
        setMyCreatedExams(data.data);
        toast.success("Exams Fetched Succesfully!");
      }
    } catch (error) {
      console.error("Error fetching your exams");
      toast.error("Something Went Wrong");
    } finally {
      setIsFetchingExams(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [appUserId]);

  if (isFetchingExams) {
    return (
      <main className="w-full h-[40vh] md:h-[50vh] flex items-center flex-col justify-center gap-y-2">
        <TextShimmerWave
          className="font-mono text-lg md:text-2xl lg:text-3xl"
          duration={1}
        >
          Fetching your exams...
        </TextShimmerWave>
      </main>
    );
  }

  return (
    <main className="w-full h-auto px-3 md:px-8 py-6 md:py-10">
      <section className="flex flex-col gap-y-6">
        <h1 className="font-bold text-2xl md:text-4xl text-center bg-gradient-to-br from-indigo-400 via-indigo-200 to-indigo-600 bg-clip-text text-transparent mb-4">
          Your Created Exams
        </h1>

        <div className="flex flex-col gap-5">
          {myCreatedExams && myCreatedExams.length === 0 ? (
            <p className="text-center text-neutral-300 text-lg md:text-xl">
              No exams found yet.
            </p>
          ) : (
            myCreatedExams &&
            myCreatedExams.length > 0 &&
            myCreatedExams.map((exam: any) => (
              <div
                key={exam._id}
                className="w-full p-5 rounded-2xl border border-neutral-700 bg-neutral-900/70 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-indigo-600/30 hover:translate-y-[-1px]"
              >
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-semibold text-indigo-400 capitalize">
                    {exam.title}
                  </h2>
                  {exam.description && (
                    <p className="text-sm md:text-base text-neutral-200/50 text-justify">
                      {exam.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore aliquam vitae deleniti. 12rem20
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex aspernatur, iusto nulla exercitationem a qui quam ullam suscipit voluptatibus dolore ipsam ipsum optio deleniti tenetur est ducimus accusamus? Nostrum, quo!
                    </p>
                  )}

                  <div className="flex flex-col md:flex-row justify-between md:items-end gap-y-3 md:gap-y-0">
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-300">
                        Duration:{" "}
                        <span className="text-white">{exam.duration} mins</span>
                      </p>
                      <p className="text-sm text-neutral-300">
                        Total Questions:{" "}
                        <span className="text-white">
                          {exam.questions?.length || 0}
                        </span>
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Created on:{" "}
                        <span className="text-neutral-300">
                          {formatDateToLongString(exam.createdAt)}
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/instructor/update-exam/${exam._id}`}
                      className="px-3 py-1.5 text-sm md:text-base font-medium rounded-lg border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
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
