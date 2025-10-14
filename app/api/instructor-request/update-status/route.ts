// POST : /api/instructor-request/update-status

import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
// IMPORTANT: Replace these with your actual Mongoose model imports
import { User } from "@/models/user.model";
import { InstructorRequest } from "@/models/instructor-request.model";

// Define the expected structure for the request body
interface RequestBody {
  requestId: string;
  adminId: string;
  status: "approved" | "rejected";
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: RequestBody = await req.json();
    const { requestId, adminId, status } = body;

    if (!requestId || !adminId || !status) {
      return NextResponse.json(
        { success: false, message: "Missing requestId, adminId, or status." },
        { status: 400 }
      );
    }

    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status value. Must be 'approved' or 'rejected'.",
        },
        { status: 400 }
      );
    }

    const adminUser = await User.findById(adminId);
    // Replace 'admin' with your actual admin role string if different
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Admin not found or insufficient privileges.",
        },
        { status: 403 }
      );
    }

    // 3. Find and Check Request Status
    const instructorRequest = await InstructorRequest.findById(requestId);

    if (!instructorRequest) {
      return NextResponse.json(
        { success: false, message: "Instructor request not found." },
        { status: 404 }
      );
    }

    if (instructorRequest.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message: `Request is already ${instructorRequest.status}. No action taken.`,
        },
        { status: 400 }
      );
    }

    // 4. Update Request Details
    instructorRequest.status = status;
    instructorRequest.processedBy = adminId;
    instructorRequest.processedAt = new Date().toISOString();

    await instructorRequest.save();

    // 5. Promote User if Approved
    if (status === "approved") {
      // The 'student' field in InstructorRequest refers to the User ID of the applicant
      const applicantId = instructorRequest.student._id;

      const updatedUser = await User.findByIdAndUpdate(
        applicantId,
        // Replace 'instructor' with your actual instructor role string if different
        { role: "instructor" },
        { new: true }
      );

      if (!updatedUser) {
        console.error(
          `User not found for ID: ${applicantId} after request approval.`
        );
        // Optional: Log an error but still return success for the request processing
      }
    }

    // 6. Success Response
    console.log(`Success Instructor request successfully ${status}.`);

    return NextResponse.json(
      {
        success: true,
        message: `Instructor request successfully ${status}.`,
        data: instructorRequest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Process Instructor Request Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error while processing request.",
      },
      { status: 500 }
    );
  }
}
