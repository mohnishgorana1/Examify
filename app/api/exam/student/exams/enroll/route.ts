//  POST /api/exam/student/exams/enroll

import connectDB from "@/lib/config/db";
import { Enrollment } from "@/models/enrollment.model";
import { Exam } from "@/models/exam.model";
import { User } from "@/models/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { studentId, examId } = body;

    if (!studentId || !examId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (studentId, examId)",
        },
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

    const exam = await Exam.findById(examId);
    if (!exam) {
      return NextResponse.json(
        { success: false, message: "Exam not found" },
        { status: 404 }
      );
    }

    if (!exam.isPublished) {
      return NextResponse.json(
        { success: false, message: "Exam is not yet published" },
        { status: 400 }
      );
    }

    // const now = new Date();
    // if (exam.scheduledAt && new Date(exam.scheduledAt) < now) {
    //   return NextResponse.json(
    //     { success: false, message: "Exam schedule has already passed" },
    //     { status: 400 }
    //   );
    // }

    const existing = await Enrollment.findOne({
      student: studentId,
      exam: examId,
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Already enrolled in this exam" },
        { status: 400 }
      );
    }

     const newEnrollment = await Enrollment.create({
      studentId: new mongoose.Types.ObjectId(studentId),
      examId: new mongoose.Types.ObjectId(examId),
      enrolledAt: new Date(),
    });

    console.log("new enrollement", newEnrollment);

    return NextResponse.json(
      {
        success: true,
        data: newEnrollment,
        message: "Successfully enrolled in the exam",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enroll Exam Error:", error);
    return NextResponse.json(
      { success: false, message: "Error enrolling in exam" },
      { status: 500 }
    );
  }
}
