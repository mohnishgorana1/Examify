//  PUT /api/exam/instructor/exams/[examId]/delete?instructorId=${instructorId}

import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import { User } from "@/models/user.model";
import { Exam } from "@/models/exam.model";
import { Submission } from "@/models/submission.model";

export async function DELETE(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const { examId } = await params;

    const url = new URL(req.url);
    const instructorId = url.searchParams.get("instructorId");

    if (!instructorId) {
      return NextResponse.json(
        { success: false, message: "Missing instructorId" },
        { status: 400 }
      );
    }
    if (!examId) {
      return NextResponse.json(
        { success: false, message: "Missing examId" },
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

    // Find exam
    const exam = await Exam.findById(examId);
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    // Ensure instructor owns this exam
    if (exam.createdBy.toString() !== instructorId.toString()) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this exam",
        },
        { status: 403 }
      );
    }

    // TODO : Delete exam and their respective submisisons:

    const submissionsResult = await Submission.deleteMany({ examId: examId });
    const deleteResult = await Exam.deleteOne({ _id: examId });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Failed to delete exam document." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: `Exam '${exam.title}' and ${submissionsResult.deletedCount} submissions deleted successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Exam Error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating exam" },
      { status: 500 }
    );
  }
}
