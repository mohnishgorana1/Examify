//++++++++++++++++++++++++++++++++++++++++++++++++++
//   POST /api/exam/instructor/exams/create
//+++++++++++++++++++++++++++++++++++++++++++++++++++

import connectDB from "@/lib/config/db";
import { Exam } from "@/models/exam.model";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, description, duration, scheduledAt, instructorId } = body;

  if (!title || !description || !duration || !scheduledAt) {
    return NextResponse.json(
      { success: false, message: "Missing Requreed Fields" },
      { status: 400 }
    );
  }
  // console.log("body", title, description, duration, scheduledAt, instructorId);
  
  if (!instructorId) {
    return NextResponse.json(
      { success: false, message: "Missing Instructor Id" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      console.log("can't find instructor")
      return NextResponse.json(
        { success: false, message: "You are not authenticated!" },
        { status: 500 }
      );
    }

    const newExam = new Exam({
      createdBy: instructorId || instructor._id,
      title,
      description,
      duration,
      scheduledAt,
    });

    console.log("newExam", newExam);

    await newExam.save();

    return NextResponse.json(
      {
        success: true,
        message: "Exam created successfully",
        data: newExam,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating exam" },
      { status: 500 }
    );
  }
}
