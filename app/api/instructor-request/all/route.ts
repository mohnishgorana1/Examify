// POST: `/api/instructor-request/all?adminId=${adminId}`

import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import { InstructorRequest } from "@/models/instructor-request.model";
import { User } from "@/models/user.model";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const adminId = searchParams.get("adminId");

    if (!adminId || !mongoose.Types.ObjectId.isValid(adminId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing adminId." },
        { status: 400 }
      );
    }

    const adminUser = await User.findById(adminId);

    // if (!adminUser || adminUser.role !== "admin") {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized. Admin access required." },
    //     { status: 403 }
    //   );
    // }

    // --- Fetch all instructor requests ---
    const instructorRequests = await InstructorRequest.find({})
      .populate("student", "name email") // optional: populate student info
      // .populate("processedBy", "name email") // optional: who processed
      .sort({ requestedAt: -1 }); // newest first

    return NextResponse.json(
      {
        success: true,
        message: "Instructor requests fetched successfully.",
        data: instructorRequests,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching instructor requests:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Something went wrong while fetching instructor requests.",
      },
      { status: 500 }
    );
  }
}
