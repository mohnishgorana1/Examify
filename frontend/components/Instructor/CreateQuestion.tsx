"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { TiInputChecked } from "react-icons/ti";
import { Label } from "../ui/label";
import { getValidAccessToken } from "@/utils/getValidAccessToken";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
export default function CreateQuestion() {
  const [text, setText] = useState("");
  const [type, setType] = useState("mcq"); // "mcq" or "truefalse"
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const [explanation, setExplanation] = useState("");
  const [message, setMessage] = useState("");

  const [token, setToken] = useState();
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setMessage("");

    if (!token) {
      setMessage("No token found.");
      setIsCreating(false);
      return;
    }

    console.log("create question data", {
      text,
      type,
      options: type === "truefalse" ? ["True", "False"] : options,
      correctAnswer,
      explanation,
    });

    try {
      const { data } = await axios.post(
        `${URLs.backend}/api/v1/exam/create-question`,
        {
          text,
          type,
          options: type === "truefalse" ? ["True", "False"] : options,
          correctAnswer,
          explanation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("✅ Question created successfully!");
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

  useEffect(() => {
    const getToken = async () => {
      const validToken: any = await getValidAccessToken();
      setToken(validToken);
    };
    getToken();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:px-8 md:py-5 bg-neutral-800 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-orange-500">
        Create Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="font-medium text-white my-2">Question Text</Label>
          <textarea
            className="w-full border rounded p-2 text-neutral-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="font-medium text-white my-2">Type</Label>
          <select
            className="w-full border rounded p-2 text-neutral-300 bg-neutral-800"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq" className="bg-neutral-800 hover:bg-neutral-950">
              MCQ
            </option>
            <option
              value="truefalse"
              className="bg-neutral-800 hover:bg-neutral-950"
            >
              True / False
            </option>
          </select>
        </div>

        {/* MCQ Options */}
        {type === "mcq" && (
          <div className="space-y-2">
            {options.map((opt, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 border rounded p-2 text-neutral-300 ${
                  correctAnswer === index ? "border-neutral-200" : ""
                }`}
              >
                <input
                  type="text"
                  className="flex-1 outline-none"
                  placeholder={`Option ${index + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...options];
                    updated[index] = e.target.value;
                    setOptions(updated);
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setCorrectAnswer(index)}
                  className={`rounded-full border transition ${
                    correctAnswer === index
                      ? "bg-orange-500 text-white border-orange-600"
                      : "bg-transparent text-white-700 border-gray-300 border-0"
                  }`}
                  title="Mark as correct"
                >
                  <TiInputChecked className="text-3xl " />
                </button>
              </div>
            ))}
          </div>
        )}
        {type === "truefalse" && (
          <div className="space-y-2">
            {["True", "False"].map((value, index) => (
              <div
                key={index}
                className={`flex items-center justify-between border rounded p-2 cursor-pointer ${
                  correctAnswer === index
                    ? "bg-neutral-800"
                    : "hover:bg-neutral-700"
                }`}
                onClick={() => setCorrectAnswer(index)}
              >
                <span className="text-sm font-medium text-white my-2">
                  {value}
                </span>
                <TiInputChecked
                  className={`text-2xl transition ${
                    correctAnswer === index
                      ? "text-orange-600"
                      : "text-white-400"
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <Label className="font-medium text-white my-2">
            Explanation (Optional)
          </Label>
          <textarea
            className="w-full border rounded p-2 text-neutral-300"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className="bg-orange-500 font-medium text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
        >
          {isCreating ? (
            <span className="flex items-center gap-x-1">
              Creating <Loader2 className="animate-spin" />
            </span>
          ) : (
            "Create Question"
          )}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
