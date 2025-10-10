//  GET /api/exam/instructor/exams/[examId] (fetch one single exam)

import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { Question } from "@/models/question.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const instructorId = url.searchParams.get("instructorId");
    const { examId } = await params;

    if (!instructorId) {
      console.log("no inst id in fetch exam detail examRes wla");

      return NextResponse.json(
        { success: false, message: "Missing instructorId" },
        { status: 400 }
      );
    }

    if (!examId) {
      console.log("instructor id", instructorId);

      console.log("no examId in fetch exam detail examRes wla");

      return NextResponse.json(
        { success: false, message: "Missing examId" },
        { status: 400 }
      );
    }

    // Check if instructor exists and has proper role
    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return NextResponse.json(
        { success: false, message: "Instructor not found or unauthorized" },
        { status: 403 }
      );
    }

    // Find the exam by ID and verify ownership
    const exam = await Exam.findById(examId)
      .populate("createdBy", "name email role")
      .populate({
        path: "questions",
        model: Question,
      })
      .lean();

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    if (exam?.createdBy._id.toString() !== instructorId.toString()) {
      console.log("You are not authorized to view this exam");

      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to view this exam",
        },
        { status: 403 }
      );
    }

    console.log("exam details", exam);

    return NextResponse.json({ success: true, data: exam }, { status: 200 });
  } catch (error) {
    console.error("Fetch Single Exam Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching exam details" },
      { status: 500 }
    );
  }
}
