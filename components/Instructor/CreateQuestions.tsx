"use client";

import React, { useState } from "react";
import axios from "axios";
import { TiInputChecked } from "react-icons/ti";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useAppUser } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateQuestion() {
  const { appUser } = useAppUser();

  const [text, setText] = useState("");
  const [type, setType] = useState("mcq"); // "mcq" or "truefalse"
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const [explanation, setExplanation] = useState("");
  const [message, setMessage] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  // if successfull creation of question
  const [createdQuestion, setCreatedQuestion] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setMessage("");

    if (appUser?.role !== "instructor") {
      console.log("Only instructor can create questions");
      return;
    }

    // console.log("create question data", {
    //   text,
    //   type,
    //   options: type === "truefalse" ? ["True", "False"] : options,
    //   correctAnswer,
    //   explanation,
    // });

    try {
      const { data } = await axios.post(
        `/api/exam/instructor/questions/create`,
        {
          text,
          type,
          options: type === "truefalse" ? ["True", "False"] : options,
          correctAnswer,
          explanation,
          instructorId: appUser?._id,
        }
      );

      if (data.success) {
        toast.success("✅ Question created successfully!");
        setCreatedQuestion(data.data);

        // Reset form
        setText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer(null);
        setExplanation("");
      } else {
        toast.error("❌ Failed to create question.");
      }
    } catch (error: any) {
      console.error("Create Question Error:", error);
      toast.error("❌ Failed to create question.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-neutral-900 px-4 py-6">
      <section className="max-w-5xl mx-auto space-y-8">
        <h1 className="font-bold text-3xl text-center text-white">
          Create Question
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="text" className="text-white font-medium">
              Question Text
            </Label>
            <textarea
              id="text"
              placeholder="Enter your question here..."
              className="w-full min-h-[100px] text-sm text-white rounded-lg border border-neutral-700 bg-neutral-800 p-2.5
                         focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          {/* Question Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-white font-medium">
              Question Type
            </Label>
            <select
              id="type"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 text-white p-2.5
                         focus:outline-none  transition duration-200 pr-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="mcq" className="bg-neutral-800">
                Multiple Choice (MCQ)
              </option>
              <option value="truefalse" className="bg-neutral-800">
                True / False
              </option>
            </select>
          </div>

          {/* MCQ Options */}
          {type === "mcq" && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Options</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 border rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200
                    ${
                      correctAnswer === index
                        ? "shadow shadow-green-950 bg-neutral-900"
                        : "border-neutral-800"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...options];
                        updated[index] = e.target.value;
                        setOptions(updated);
                      }}
                      className="flex-1 bg-transparent text-white outline-none text-sm "
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setCorrectAnswer(index)}
                      className={`rounded-full p-1.5 transition ${
                        correctAnswer === index
                          ? "bg-green-500 text-white"
                          : "text-gray-400 hover:text-green-400"
                      }`}
                      title="Mark as correct"
                    >
                      <TiInputChecked className="text-2xl" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* True/False Options */}
          {type === "truefalse" && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Select Answer</Label>
              {["True", "False"].map((value, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between border rounded-lg p-2.5 cursor-pointer transition 
                    ${
                      correctAnswer === index
                        ? "border-green-950 text-green-700"
                        : "border-neutral-700 hover:bg-neutral-800"
                    }`}
                  onClick={() => setCorrectAnswer(index)}
                >
                  <span className="text-sm font-medium">{value}</span>
                  <TiInputChecked
                    className={`text-2xl ${
                      correctAnswer === index
                        ? "text-green-700 "
                        : "text-neutral-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Explanation */}
          <div className="space-y-2">
            <Label htmlFor="explanation" className="text-white font-medium">
              Explanation (Optional)
            </Label>
            <textarea
              id="explanation"
              placeholder="Add a short explanation for this question (optional)"
              className="w-full min-h-[80px] text-sm text-white rounded-lg border border-neutral-700 bg-neutral-800 p-2.5 
                         focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
            disabled={isCreating}
          >
            {isCreating ? (
              <span className="flex items-center gap-x-2">
                Creating <Loader2 className="animate-spin h-5 w-5" />
              </span>
            ) : (
              "Create Question"
            )}
          </Button>

          {message && (
            <p className="text-sm text-center text-red-400 pt-2">{message}</p>
          )}
        </form>

        {/* ✅ Show created question summary here */}
        {createdQuestion && (
          <div className="mt-10 bg-neutral-800 border border-neutral-700 rounded-lg p-5 text-white space-y-3">
            <h2 className="text-lg font-semibold text-indigo-400 text-center">
              Last Created Question 
            </h2>
            <p>
              <strong>Question:</strong> {createdQuestion.text}
            </p>
            <p>
              <strong>Type:</strong> {createdQuestion.type}
            </p>
            {createdQuestion.options && (
              <div>
                <strong>Options:</strong>
                <ul className="list-disc ml-5 space-y-1">
                  {createdQuestion.options.map((opt: string, i: number) => (
                    <li
                      key={i}
                      className={`${
                        createdQuestion.correctAnswer === i
                          ? "text-green-400 font-semibold"
                          : ""
                      }`}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {createdQuestion.explanation && (
              <p>
                <strong>Explanation:</strong> {createdQuestion.explanation}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
