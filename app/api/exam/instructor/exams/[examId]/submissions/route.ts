// GET /api/exam/instructor/exams/[examId]/submissions?instructorId=${instructorId}
import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { Submission } from "@/models/submission.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/user.model";

export async function GET(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const { examId } = params;
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
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return NextResponse.json(
        { success: false, message: "Invalid exam ID format" },
        { status: 400 }
      );
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    // 2. Find all submissions for this exam ID
    const submissions = await Submission.find({ examId: examId })
      .populate({
        path: "studentId",
        model: User,
      })
      .sort({ submittedAt: -1 }) // Sort by latest submission first
      .lean(); // Use lean for better performance

    if (!submissions || submissions.length === 0) {
      return NextResponse.json(
        { success: false, message: "No submissions found for this exam." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { exam, submissions } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Exam Submissions Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching exam submissions" },
      { status: 500 }
    );
  }
}
