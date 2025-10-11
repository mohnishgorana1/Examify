"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAppUser } from "@/contexts/UserContext";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

type Question = {
  createdBy: string;
  text: string;
  type: "mcq" | "truefalse";
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
};

type Exam = {
  title: string;
  description: string;
  duration: number;
  questions: string[];
  isPublished?: boolean;
};

function UpdateExamDashboard({ examId }: { examId: string }) {
  const { appUser } = useAppUser();
  const router = useRouter();
  const [formData, setFormData] = useState<Exam>({
    title: "",
    description: "",
    duration: 60,
    questions: [],
  });

  const [marksPerQuestion, setMarksPerQuestion] = useState(1);
  const [passingPercentage, setPassingPercentage] = useState(40);

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  const [isFetchingExamDetails, setIsFetchingExamDetails] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // states for publish exam
  const [isScheduleDirty, setIsScheduleDirty] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState("");

  const [open, setOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Fetch exam and instructor questions
  const fetchDetails = async () => {
    setIsFetchingExamDetails(true);
    if (!examId) {
      toast.error("No Exam Id");
    }
    try {
      const examRes = await axios.get(
        `/api/exam/instructor/exams/${examId}?instructorId=${appUser?._id}`
      );

      const questionsRes = await axios.get(
        `/api/exam/instructor/questions?instructorId=${appUser?._id}`
      );

      console.log("exam res", examRes);
      console.log("ques res", questionsRes);

      if (examRes.data.success && questionsRes.data.success) {
        const {
          title,
          description,
          duration,
          questions,
          scheduledAt,
          isPublished,
          marksPerQuestion,
          totalMarks,
          passingMarks,
        } = examRes.data.data;

        // new Date() automatically UTC ko local time me convert karta hai.
        const scheduledDateObj = scheduledAt ? new Date(scheduledAt): undefined;

        setDate(scheduledDateObj); // calendar ke liye local date

        setScheduledTime(
          scheduledDateObj
            ? `${String(scheduledDateObj.getHours()).padStart(2, "0")}:${String(
                scheduledDateObj.getMinutes()
              ).padStart(2, "0")}`
            : "10:00"
        );
        

        // derive passing percentage from stored values
        const computedPassingPercentage =
          totalMarks && passingMarks
            ? Math.round((passingMarks / totalMarks) * 100)
            : 40; // fallback if missing

        setMarksPerQuestion(marksPerQuestion ?? 1);
        setPassingPercentage(computedPassingPercentage);

        setFormData({
          title,
          description,
          duration,
          questions: questions.map((q: any) => q._id),
          isPublished,
        });
        setAllQuestions(questionsRes.data.data);

        toast.success("Exam Details Fetched", { duration: 2000 });
      }
    } catch (error) {
      console.error("Something went wrong while fetching data: ", error);
      toast.error("Error fetching Exam Details", { duration: 2000 });
      setError("Something went wrong while fetching data");
    } finally {
      setIsFetchingExamDetails(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };
  const toggleQuestion = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.includes(questionId)
        ? prev.questions.filter((id) => id !== questionId)
        : [...prev.questions, questionId],
    }));
  };

  // Helper: Check if scheduled date is missed/past
  const isScheduleMissed = () => {
    if (!date) return true; // No date yet → considered missed
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(hours);
    scheduledDateTime.setMinutes(minutes);
    return scheduledDateTime <= new Date();
  };

  // Submit update
  const handleUpdateExam = async () => {
    setIsUpdating(true);

    try {
      const { title, description, duration, questions } = formData;

      // const totalMarks = formData.questions.length * marksPerQuestion;
      // const passingMarks = Math.ceil(totalMarks * (passingPercentage / 100));

      // Combine date + time into ISO
      let scheduledAt: string | null = null;

      if (date) {
        const [hours, minutes] = scheduledTime.split(":").map(Number);

        const scheduledDateTime = new Date(date);
        scheduledDateTime.setHours(hours);
        scheduledDateTime.setMinutes(minutes);

        scheduledAt = scheduledDateTime.toISOString(); // this will automatically convert to UTC ISO for storage
      }

      const updateExamRes = await axios.put(
        `/api/exam/instructor/exams/${examId}/update`,
        {
          instructorId: appUser?._id,
          title,
          description,
          duration,
          questions,
          scheduledAt,
          marksPerQuestion,
          passingPercentage,
        }
      );

      if (updateExamRes.data.success) {
        toast.success("Exam updated successfully!");
        console.log("res", updateExamRes.data);
        // router.refresh();
        setIsScheduleDirty(false); // ✅ reset dirty flag
        await fetchDetails();
      } else {
        toast.error("Failed to update exam.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update exam.");
    } finally {
      setIsUpdating(false);
    }
  };

  // publish exam
  const handleTogglePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await axios.put(
        `/api/exam/instructor/exams/${examId}/publish`,
        {
          instructorId: appUser?._id,
          questions: formData.questions,
          marksPerQuestion,
          passingPercentage,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchDetails();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error publishing exam:", error);
      toast.error("Failed to toggle publish state");
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (isFetchingExamDetails) {
    return (
      <section className="w-full h-[60vh] flex flex-col gap-y-3 items-center justify-center">
        <TextShimmerWave
          className="font-mono text-lg md:text-2xl lg:text-3xl"
          duration={1}
        >
          Fetching Exam Details
        </TextShimmerWave>
      </section>
    );
  }

  if (error)
    return (
      <section className="w-full h-[60vh] flex flex-col gap-y-3 items-center justify-center">
        <p className="text-red-500 p-4 text-xl">ERROR: {error}</p>;
      </section>
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-[95vh] pb-14 py-10 px-4 md:px-10 bg-gradient-to-b from-neutral-900 to-neutral-950 space-y-4"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-500 text-center tracking-wide">
        Update Exam
      </h1>

      {/* Inputs */}
      <div className="space-y-3">
        <label className="block font-medium text-neutral-100">
          Title
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-neutral-800 p-2 rounded-lg mt-1 bg-neutral-900 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </label>

        <label className="block font-medium text-neutral-100">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-neutral-800 p-2 rounded-lg mt-1 bg-neutral-900 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </label>
      </div>

      {/* Marks + Passing */}
      <div className="grid md:grid-cols-3 gap-4">
        <label className="block font-medium text-neutral-100">
          Duration (in minutes)
          <input
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-neutral-800 p-2 rounded-lg mt-1 bg-neutral-900 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </label>
        <label className="block font-medium text-neutral-100">
          Marks Per Question
          <select
            value={marksPerQuestion}
            onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
            className="w-full border border-neutral-800 p-2 rounded-lg mt-1 bg-neutral-900 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
          >
            {[1, 2, 4, 5, 10].map((mark) => (
              <option key={mark} value={mark} className="bg-neutral-900">
                {mark}
              </option>
            ))}
          </select>
        </label>

        <label className="block font-medium text-neutral-100">
          Passing Percentage
          <select
            value={passingPercentage}
            onChange={(e) => setPassingPercentage(Number(e.target.value))}
            className="w-full border border-neutral-800 p-2 rounded-lg mt-1 bg-neutral-900 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
          >
            {[33, 40, 50, 60, 70, 80].map((percent) => (
              <option
                key={percent}
                value={percent}
                className="bg-neutral-900 text-white"
              >
                {percent}%
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Scheduled Date & Time */}
      <div className="my-8">
        <h2 className="text-lg font-semibold text-indigo-400 mb-3">
          Scheduled Date & Time
        </h2>
        <div className="flex flex-wrap gap-6 gap-x-8 items-end">
          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="px-1 text-neutral-100 font-medium block ">
              Scheduled Date
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-40 justify-between font-normal bg-neutral-800 text-white 
                     border border-neutral-700 hover:bg-neutral-700 hover:text-white 
                     h-[44px] px-3 py-2" // ✅ added consistent height + padding
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon size={16} className="ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0 bg-neutral-800 border-neutral-700"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                    setIsScheduleDirty(true);
                  }}
                  classNames={{
                    day_selected:
                      "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white",
                    day_today: "bg-indigo-900 text-white",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="time-picker"
              className="px-1 text-neutral-100 font-medium block "
            >
              Scheduled Time (Local)
            </label>
            <input
              type="time"
              id="time-picker"
              step="60"
              value={scheduledTime}
              // onChange={(e) => setScheduledTime(e.target.value)}
              onChange={(e) => {
                setScheduledTime(e.target.value);
                setIsScheduleDirty(true);
              }}
              className="bg-neutral-800 text-white w-40 rounded-lg border border-neutral-700 
                 h-[44px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Add Questions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-indigo-400 mb-3">
          Add / Remove Questions
        </h2>

        {formData.questions.length === 0 && (
          <p className="text-base text-red-500 mb-3 animate-pulse">
            ⚠️ This exam currently has <strong>no questions.</strong> Please add
            questions before publishing.
          </p>
        )}

        {allQuestions && allQuestions.length === 0 && (
          <p className="text-neutral-400 italic text-sm">
            You haven&apos;t created any questions yet.
          </p>
        )}

        <Accordion type="single" collapsible className="w-full space-y-2.5">
          {allQuestions &&
            allQuestions.length > 0 &&
            allQuestions.map((q: any) => (
              <AccordionItem key={q._id} value={q._id}>
                <AccordionTrigger className="border border-b-0  border-neutral-800 bg-neutral-900 flex items-center justify-between px-3 py-2 text-white hover:bg-neutral-800 transition-all duration-200 rounded-t-md">
                  {/* Left Side: Checkbox + Question Text */}
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    {" "}
                    {/* Use flex-grow and min-w-0 */}
                    <input
                      type="checkbox"
                      checked={formData.questions.includes(q._id)}
                      onChange={() => toggleQuestion(q._id)}
                      onClick={(e) => e.stopPropagation()}
                      className="accent-indigo-500 cursor-pointer"
                    />
                    {/* Ensure text wraps or truncates correctly */}
                    <span className="font-medium truncate">{q.text}</span>
                  </div>

                  {/* Right Side: Hint text (hidden on open) */}
                  <span className="text-sm text-indigo-400 opacity-80 shrink-0 ml-4">
                    {formData.questions.includes(q._id)
                      ? "Selected"
                      : "Click to view"}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pl-6 text-sm text-neutral-300 space-y-1  bg-neutral-900 p-3 border-t-0 border-neutral-800">
                  <p>
                    <strong>Type:</strong>{" "}
                    {q.type === "mcq" ? "Multiple Choice" : "True/False"}
                  </p>

                  {q.type === "mcq" && (
                    <div>
                      <strong>Options:</strong>
                      <ul className="list-disc pl-5 space-y-1">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={
                              i === q.correctAnswer
                                ? "text-green-400 font-semibold"
                                : ""
                            }
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {q.type === "truefalse" && (
                    <p>
                      <strong>Answer:</strong>{" "}
                      {q.correctAnswer === 0 ? "False" : "True"}
                    </p>
                  )}

                  {q.explanation && (
                    <p>
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>

      {/* Button */}
      <section className="flex flex-wrap gap-x-3 gap-y-3 mt-8">
        {/* Update Exam button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleUpdateExam}
          className="font-semibold px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-600/30 disabled:opacity-60"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className="flex items-center justify-center gap-2">
              Updating...
              <Loader2 className="animate-spin" size={18} />
            </span>
          ) : (
            "Update Exam"
          )}
        </motion.button>

        {/* Conditional Publish button or message */}
        {/* Publish / Unpublish button logic */}
        {formData.questions.length > 0 ? (
          !isScheduleMissed() && !isScheduleDirty ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleTogglePublish}
              className={`font-semibold px-5 py-3 rounded-lg transition-all duration-300 shadow-md disabled:opacity-60 ${
                formData.isPublished
                  ? "bg-red-700 hover:bg-red-800 text-white shadow-red-700/30"
                  : "bg-green-700 hover:bg-green-800 text-white shadow-green-700/30"
              }`}
              disabled={isPublishing || isScheduleDirty}
            >
              {isPublishing ? (
                <span className="flex items-center justify-center gap-2">
                  {formData.isPublished ? "Unpublishing..." : "Publishing..."}
                  <Loader2 className="animate-spin" size={18} />
                </span>
              ) : formData.isPublished ? (
                "Unpublish Exam"
              ) : (
                "Publish Exam"
              )}
            </motion.button>
          ) : (
            <div className="flex flex-col justify-center bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-yellow-400 max-w-md">
              <p className="font-medium">
                ⚠️ Scheduled date/time has already passed.
              </p>
              <p className="text-sm text-neutral-300 mt-1">
                Please{" "}
                <span className="font-semibold text-indigo-400">update</span>{" "}
                the exam schedule before publishing.
              </p>
            </div>
          )
        ) : (
          <p className="text-red-500 font-medium mt-2">
            ⚠️ Add at least one question to enable publishing.
          </p>
        )}
      </section>
    </motion.section>
  );
}

export default UpdateExamDashboard;
