"use client";

import React, { useState } from "react";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { TiInputChecked } from "react-icons/ti";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
export default function CreateQuestion() {
  const [text, setText] = useState("");
  const [type, setType] = useState("mcq"); // "mcq" or "truefalse"
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("No token found.");
      setLoading(false);
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
        setMessage("✅ Question created successfully!");
        // Reset form
        setText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer(null);
        setExplanation("");
      } else {
        setMessage("❌ Failed to create question.");
      }
    } catch (error: any) {
      console.error("Create Question Error:", error);
      setMessage("❌ Error creating question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-emerald-700">
        Create Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="font-medium">Question Text</Label>
          <textarea
            className="w-full border rounded p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="font-medium">Type</Label>
          <select
            className="w-full border rounded p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq">MCQ</option>
            <option value="truefalse">True / False</option>
          </select>
        </div>

        {/* MCQ Options */}
        {type === "mcq" && (
          <div className="space-y-2">
            {options.map((opt, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 border rounded p-2 ${
                  correctAnswer === index
                    ? "bg-emerald-100 border-emerald-500"
                    : ""
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
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-transparent text-gray-700 border-gray-300 border-0"
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
                    ? "bg-emerald-100 border-emerald-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setCorrectAnswer(index)}
              >
                <span className="text-sm font-medium">{value}</span>
                <TiInputChecked
                  className={`text-2xl transition ${
                    correctAnswer === index
                      ? "text-emerald-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <Label className="font-medium">Explanation (Optional)</Label>
          <textarea
            className="w-full border rounded p-2"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
        >
          {loading ? "Creating..." : "Create Question"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
