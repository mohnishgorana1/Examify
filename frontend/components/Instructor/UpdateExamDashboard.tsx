"use client";
import { URLs } from "@/constants/urls";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

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
  const pathname = usePathname();
  const router = useRouter();
  const { user, getValidAccessToken, logout } = useAuth();

  const [formData, setFormData] = useState<Exam>({
    title: "",
    description: "",
    duration: 60,
    questions: [],
  });

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // 🔹 Fetch exam and instructor questions
  const fetchDetails = async () => {
    const token = await getValidAccessToken();
    console.log("Token for fetcing exam details", token);

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
      }
    } catch (error) {
      console.error("Something went wrong while fetching data: ", error);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
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
    console.log("formdata", formData);
    setIsUpdating(true);

    try {
      const token = await getValidAccessToken();
      const { title, description, duration, questions } = formData;

      const res = await axios.put(
        `${URLs.backend}/api/v1/exam/${examId}`,
        { title, description, duration, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Exam updated successfully!");
        console.log("res", res.data);

        // router.push("/dashboard/instructor");
      } else {
        alert("Failed to update exam.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }finally{
      setIsUpdating(false)
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg shadow-gray-400 p-6 space-y-4">
        <h1 className="text-2xl font-bold text-emerald-700">Edit Exam</h1>

        <div className="space-y-2">
          <label className="block font-medium">
            Title
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <label className="block font-medium">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>

          <label className="block font-medium">
            Duration (in minutes)
            <input
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </label>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-emerald-800">
            Add/Remove Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {allQuestions.map((q, idx) => (
              <AccordionItem key={q._id} value={q._id}>
                <AccordionTrigger className="group border grid md:grid-cols-3">
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.questions.includes(q._id)}
                      onChange={() => toggleQuestion(q._id)}
                      onClick={(e) => e.stopPropagation()} // to avoid toggling accordion
                    />
                    <span className="font-medium">{q.text}</span>
                  </div>

                  <span className="text-left pl-5 md:text-right md:pr-5 md:col-span-1 text-sm text-gray-500 group-data-[state=open]:hidden">
                    Click to view details
                  </span>
                  <span className="text-left pl-5 md:text-right md:pr-5 md:col-span-1 text-sm text-gray-500 hidden group-data-[state=open]:inline ">
                    Hide details
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pl-6 text-sm text-gray-700 space-y-1 bg-white rounded p-3 border">
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

        <button
          onClick={handleUpdateExam}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-800"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className="flex items-center">
              <span>Updating.. </span>
              <span>
                <Loader2 className="animate-spin text-xs"  size={20}/>
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
