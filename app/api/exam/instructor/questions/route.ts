// GET /api/exam/instructor/questions (my created questions)

import connectDB from "@/lib/config/db";
import { Question } from "@/models/question.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const instructorId = url.searchParams.get("instructorId");

    if (!instructorId) {
      return NextResponse.json(
        { success: false, message: "Missing instructorId" },
        { status: 400 }
      );
    }

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return NextResponse.json(
        { success: false, message: "Instructor not found or unauthorized" },
        { status: 403 }
      );
    }

    const questions = await Question.find({ createdBy: instructorId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { success: true, data: questions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Questions Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching questions" },
      { status: 500 }
    );
  }
}
