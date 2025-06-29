"use client";
import { URLs } from "@/constants/urls";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../Loader";

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
};

function UpdateExamDashboard({ examId }: { examId: string }) {
  const { getValidAccessToken } = useAuth();

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

  // 🔹 Fetch exam and instructor questions
  const fetchDetails = async () => {
    const token = await getValidAccessToken();
    setIsFetchingExamDetails(true);
    try {
      const examRes = await axios.get(`${URLs.backend}/api/v1/exam/${examId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const questionsRes = await axios.get(
        `${URLs.backend}/api/v1/exam/my-created-questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (examRes.data.success && questionsRes.data.success) {
        const { title, description, duration, questions } = examRes.data.exam;
        setFormData({ title, description, duration, questions });
        setAllQuestions(questionsRes.data.questions);

        toast.success("Exam Details Fetched", { duration: 2000 });
      }
    } catch (error) {
      console.error("Something went wrong while fetching data: ", error);
      toast.success("Error fetching Exam Details", { duration: 2000 });
      setError("Something went wrong while fetching data.");
    } finally {
      setIsFetchingExamDetails(false);
    }
  };

  // 🔹 Input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  // 🔹 Toggle question
  const toggleQuestion = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.includes(questionId)
        ? prev.questions.filter((id) => id !== questionId)
        : [...prev.questions, questionId],
    }));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // 🔹 Submit update
  const handleUpdateExam = async () => {
    setIsUpdating(true);

    try {
      const token = await getValidAccessToken();
      const { title, description, duration, questions } = formData;

      const totalMarks = formData.questions.length * marksPerQuestion;
      const passingMarks = Math.ceil(totalMarks * (passingPercentage / 100));

      const res = await axios.put(
        `${URLs.backend}/api/v1/exam/${examId}`,
        {
          title,
          description,
          duration,
          questions,
          totalMarks,
          passingMarks,
          marksPerQuestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Exam updated successfully!");
        console.log("res", res.data);
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

  if (isFetchingExamDetails) {
    return (
      <section className="w-full h-[60vh] flex flex-col gap-y-3 items-center justify-center">
        <Loader />
        <h1 className="text-white">Fetching Exam Details</h1>
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
    <section className="min-h-[95vh] py-10 px-4 bg-gradient-to-b from-neutral-800 from-5% via-35% via-neutral-950 to-black to-90%">
      <div className="max-w-3xl mx-auto bg-neutral-800 rounded-xl shadow-xl shadow-gray-500 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-orange-500">Edit Exam</h1>

        <div className="space-y-2">
          <label className="block font-medium text-white">
            Title
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 text-neutral-200"
            />
          </label>

          <label className="block font-medium text-white">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 text-neutral-200"
            />
          </label>

          <label className="block font-medium text-white">
            Duration (in minutes)
            <input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 text-neutral-200"
            />
          </label>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-orange-500">
            Add/Remove Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2.5">
            {allQuestions.map((q: any, idx) => (
              <AccordionItem key={q._id} value={q._id}>
                <AccordionTrigger className="border grid md:grid-cols-3 px-2 gap-3 text-white">
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.questions.includes(q._id)}
                      onChange={() => toggleQuestion(q._id)}
                      onClick={(e) => e.stopPropagation()} // to avoid toggling accordion
                      className="bg-white"
                    />
                    <span className="font-medium">{q.text}</span>
                  </div>

                  <span className="hover:underline text-left pl-5 md:text-right md:pr-5 md:col-span-1 text-sm text-orange-500 opacity-80 group-data-[state=open]:hidden">
                    Click to view details
                  </span>
                  <span className="hover:underline text-left pl-5 md:text-right md:pr-5 md:col-span-1 text-sm text-orange-500 opacity-80 hidden group-data-[state=open]:inline ">
                    Hide details
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pl-6 text-sm text-white space-y-1 bg-neutral-800 rounded p-3 border">
                  <p>
                    <strong>Type:</strong>{" "}
                    {q.type === "mcq" ? "Multiple Choice" : "True/False"}
                  </p>

                  {q.type === "mcq" && (
                    <div>
                      <strong>Options:</strong>
                      <ul className="list-disc pl-5">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={
                              i === q.correctAnswer
                                ? "text-green-600 font-semibold"
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

        <label className="block font-medium text-white">
          Marks Per Question
          <select
            value={marksPerQuestion}
            onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1 text-neutral-200"
          >
            {[1, 2, 4, 5, 10].map((mark) => (
              <option key={mark} value={mark} className="bg-neutral-900">
                {mark}
              </option>
            ))}
          </select>
        </label>

        <label className="block font-medium text-white">
          Passing Percentage
          <select
            value={passingPercentage}
            onChange={(e) => setPassingPercentage(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1 text-neutral-200"
          >
            {[33, 40, 50, 60, 70, 80].map((percent) => (
              <option key={percent} value={percent} className="bg-neutral-900">
                {percent}%
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={handleUpdateExam}
          className="font-medium mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-800"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className="flex items-center">
              <span>Updating.. </span>
              <span>
                <Loader2 className="animate-spin text-xs" size={20} />
              </span>
            </span>
          ) : (
            "Update Exam"
          )}
        </button>
      </div>
    </section>
  );
}

export default UpdateExamDashboard;
