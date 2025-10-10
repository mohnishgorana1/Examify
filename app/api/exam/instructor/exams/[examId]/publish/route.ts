//  PUT /api/exam/instructor/exams/[examId]/publish
import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const { examId } = params;
    const body = await req.json();
    const { instructorId, questions, marksPerQuestion, passingPercentage } =
      body;

    if (!instructorId || !examId) {
      return NextResponse.json(
        { success: false, message: "Missing instructorId or examId" },
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

    const exam = await Exam.findById(examId);

    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    // Check ownership
    if (exam.createdBy.toString() !== instructorId.toString()) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to modify this exam",
        },
        { status: 403 }
      );
    }

    if (Array.isArray(questions)) exam.questions = questions;

    const questionCount = exam.questions.length;

    if (questionCount === 0) {
      exam.isPublished = false;
      exam.publishedAt = null;
      await exam.save();
      return NextResponse.json(
        { success: false, message: "Cannot publish an exam with no questions" },
        { status: 400 }
      );
    }

    // Compute marks
    const totalMarks = questionCount * marksPerQuestion;
    const passingMarks = Math.ceil(totalMarks * (passingPercentage / 100));

    exam.totalMarks = totalMarks;
    exam.passingMarks = passingMarks;
    exam.marksPerQuestion = marksPerQuestion;

    // Check if scheduled date is valid
    if (!exam.scheduledAt || new Date(exam.scheduledAt) <= new Date()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Scheduled date/time is missing or already passed. Please update it before publishing.",
        },
        { status: 400 }
      );
    }

    // Toggle publish state
    exam.isPublished = !exam.isPublished;
    exam.publishedAt = exam.isPublished ? new Date() : null;

    await exam.save();

    return NextResponse.json(
      {
        success: true,
        message: exam.isPublished
          ? "✅ Exam published successfully!"
          : "🚫 Exam unpublished successfully!",
        data: exam,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling publish state:", error);
    return NextResponse.json(
      { success: false, message: "Error toggling publish state" },
      { status: 500 }
    );
  }
}
