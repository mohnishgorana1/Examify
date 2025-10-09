// POST /api/exam/instructor/questions/create

import connectDB from "@/lib/config/db";
import { Question } from "@/models/question.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { text, type, options, correctAnswer, explanation, instructorId } =
    body;
  console.log(
    "body",
    text,
    type,
    options,
    correctAnswer,
    explanation,
    instructorId
  );
  if (
    !text ||
    !type ||
    correctAnswer === null ||
    correctAnswer === undefined ||
    !options ||
    options.length === 0
  ) {
    console.log("missing");
    return NextResponse.json(
      { success: false, message: "Missing Required Fields" },
      { status: 400 }
    );
  }

  if (!instructorId) {
    console.log("missing inst id");

    return NextResponse.json(
      { success: false, message: "Missing Instructor Id" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      console.log("can't find instructor");
      return NextResponse.json(
        { success: false, message: "You are not authenticated!" },
        { status: 500 }
      );
    }

    const newQuestion = new Question({
      createdBy: instructorId || instructor._id,
      text,
      type,
      options,
      correctAnswer,
      explanation,
    });

    // console.log("newQuestion", newQuestion);

    await newQuestion.save();

    return NextResponse.json(
      {
        success: true,
        message: "Question created successfully",
        data: newQuestion,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating Question" },
      { status: 500 }
    );
  }
}
