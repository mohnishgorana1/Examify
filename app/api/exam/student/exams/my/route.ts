// GET /api/exam/student/exams/my (enrolled exams)

import connectDB from "@/lib/config/db";
import { Enrollment } from "@/models/enrollment.model";
import { Exam } from "@/models/exam.model";
import { Submission } from "@/models/submission.model";
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

    const now = new Date();

    // 🧾 Submissions (attempted)
    const submissions = await Submission.find({ studentId }).select("examId");
    const attemptedExamIds = submissions.map((s) => s.examId.toString());

    // 📋 Enrollments
    const enrollments = await Enrollment.find({ studentId }).select("examId");
    const enrolledExamIds = enrollments.map((e) => e.examId.toString());

    // 🟢 1. Attempted Exams
    const attemptedExams = await Exam.find({
      _id: { $in: attemptedExamIds },
    }).sort({ scheduledAt: -1 });

    // 🟡 2. Enrolled But Not Attempted
    const enrolledNotAttemptedIds = enrolledExamIds.filter(
      (id) => !attemptedExamIds.includes(id)
    );

    const enrolledExams = await Exam.find({
      _id: { $in: enrolledNotAttemptedIds },
    });

    // Split enrolled exams into:
    const enrolledOnlyExams = enrolledExams.filter(
      (exam) => new Date(exam.scheduledAt) >= now
    );
    const expiredExams = enrolledExams.filter(
      (exam) => new Date(exam.scheduledAt) < now
    );

    // console.log(attemptedExams, enrolledOnlyExams, expiredExams);

    return NextResponse.json(
      {
        success: true,
        message: "New Exams Fetched Successfully",
        data: { attemptedExams, enrolledOnlyExams, expiredExams },
      },
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
