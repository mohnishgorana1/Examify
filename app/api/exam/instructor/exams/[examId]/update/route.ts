//  PUT /api/exam/instructor/exams/[examId]/update

import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import { User } from "@/models/user.model";
import { Exam } from "@/models/exam.model";
import { Question } from "@/models/question.model";

export async function PUT(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
    await connectDB();

    const { examId } = await params;
    const body = await req.json();

    const {
      instructorId,
      title,
      description,
      duration,
      questions = [],
      marksPerQuestion,
      passingPercentage,
      scheduledAt,
    } = body;

    console.log(
      "BODY",
      "\ninstructorId",
      instructorId,
      "\ntitle",
      title,
      "\ndescription",
      description,
      "\nduration",
      duration,
      "\nquestions",
      questions,
      "\nmarksPerQuestion",
      marksPerQuestion,
      "\npassingPercentage",
      passingPercentage,
      "\nscheduledAt",
      scheduledAt
    );

    // Validations
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

    // console.log("Exam before update", exam);

    // Ensure instructor owns this exam
    if (exam.createdBy.toString() !== instructorId.toString()) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update this exam",
        },
        { status: 403 }
      );
    }

    // Compute marks and handle auto-unpublish
    const questionCount = Array.isArray(questions) ? questions.length : 0;
    const totalMarks = questionCount * marksPerQuestion;
    const passingMarks = Math.ceil(totalMarks * (passingPercentage / 100));

    // If no questions → auto unpublish
    if (questionCount === 0) {
      exam.isPublished = false;
      exam.publishedAt = null;
    }
    // Update fields
    exam.title = title ?? exam.title;
    exam.description = description ?? exam.description;
    exam.duration = duration ?? exam.duration;
    exam.questions = questions ?? exam.questions;
    exam.marksPerQuestion = marksPerQuestion;
    exam.passingPercentage = passingPercentage;
    exam.totalMarks = totalMarks;
    exam.passingMarks = passingMarks;

    if (scheduledAt) exam.scheduledAt = new Date(scheduledAt);

    await exam.save();

    // Populate to return updated details
    const updatedExam = await Exam.findById(examId)
      .populate("createdBy", "name email role")
      .populate({
        path: "questions",
        model: Question,
      })
      .lean();

    // console.log("Exam after update", updatedExam);

    return NextResponse.json(
      {
        success: true,
        message: "Exam updated successfully",
        data: updatedExam,
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
