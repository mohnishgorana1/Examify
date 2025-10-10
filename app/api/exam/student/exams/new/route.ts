// GET /api/exam/student/exams/new (available exams)

import connectDB from "@/lib/config/db";
import { Enrollment } from "@/models/enrollment.model";
import { Exam } from "@/models/exam.model";
import { User } from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "Missing studentId" },
        { status: 400 }
      );
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return NextResponse.json(
        { success: false, message: "Student not found or unauthorized" },
        { status: 403 }
      );
    }

    const enrolledExamIds = (
      await Enrollment.find({ studentId }).select("examId")
    ).map((e) => e.examId.toString());

    const now = new Date();

    //Exams NOT enrolled
    const newExams = await Exam.find({
      _id: {
        $nin: enrolledExamIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
      isPublished: true,
      scheduledAt: { $gt: now },
    }).sort({ scheduledAt: 1 });

    if (!newExams || newExams.length === 0) {
      return NextResponse.json(
        { success: false, message: "No Exam Found" },
        { status: 401 }
      );
    }

    console.log("newExams", newExams);

    return NextResponse.json(
      { success: true, data: newExams, message: "New Exams Fetched Successfully" },
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
