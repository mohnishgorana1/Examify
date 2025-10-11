// GET /api/exam/student/exams/[examId] (get exam detail for student)

import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { Question } from "@/models/question.model";
import { Submission } from "@/models/submission.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    const { examId } = await params;

    if (!studentId) {
      console.log("no std id in fetch exam detail examRes wla");

      return NextResponse.json(
        { success: false, message: "Missing studentId" },
        { status: 400 }
      );
    }
    if (!examId) {
      console.log("student id", studentId);

      console.log("no examId in fetchfull exam detail ");

      return NextResponse.json(
        { success: false, message: "Missing examId" },
        { status: 400 }
      );
    }

    // Check if student exists and has proper role
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return NextResponse.json(
        { success: false, message: "student not found or unauthorized" },
        { status: 403 }
      );
    }

    const exam = await Exam.findById(examId)
      .populate({
        path: "questions",
        model: Question,
      })
      .exec();
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    // ✅ Check if the student submitted the exam
    const submission = await Submission.findOne({ examId, studentId });
    const isAttempted = !!submission;

    return NextResponse.json(
      {
        success: true,
        message: "Exam details fetched",
        data: {
          exam,
          isAttempted,
          score: submission?.score || null,
          submittedAt: submission?.submittedAt || null,
          userAnswers: submission?.answers || [],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Single Exam Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching exam details" },
      { status: 500 }
    );
  }
}
