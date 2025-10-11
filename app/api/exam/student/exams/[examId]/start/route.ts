// POST /api/exam/student/exams/[examId]/start

import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { Question } from "@/models/question.model";
import { Submission } from "@/models/submission.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const { examId } = await params;

    const { studentId } = await req.json();

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "Missing studentId" },
        { status: 400 }
      );
    }
    if (!examId) {
      console.log("exam id", examId);

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

    const alreadySubmitted = await Submission.findOne({
      examId,
      studentId,
      status: { $in: ["submitted", "auto-submitted"] },
    });

    if (alreadySubmitted) {
      return NextResponse.json(
        { success: false, message: "You have already submitted this exam" },
        { status: 403 }
      );
    }

    // Count previous submissions for attempt number
    const previousAttempts = await Submission.countDocuments({
      examId,
      studentId,
    });

    // create new submissions
    const submission = await Submission.findOneAndUpdate(
      {
        examId,
        studentId,
        status: "started",
      },
      {
        $setOnInsert: {
          examId,
          studentId,
          status: "started",
          attemptNumber: previousAttempts + 1,
          startedAt: new Date(),
          score: 0,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Exam Started",
        data: {
          submission,
          exam,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error: starting exam", error);
    return NextResponse.json(
      { success: false, message: "Error starting exam" },
      { status: 500 }
    );
  }
}
