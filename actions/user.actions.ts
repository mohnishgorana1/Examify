"use server";
import connectDB from "@/lib/config/db";
import { User } from "@/models/user.model";

export const createAccountInDatabase = async (
  clerkUserId: string,
  name: string,
  email: string,
  phone?: string,
  dob?: Date
): Promise<{
  success: boolean;
  status: number;
  message: string;
  data?: any;
}> => {
  await connectDB();

  try {
    // Validation
    if (!clerkUserId || !email) {
      return {
        success: false,
        status: 400,
        message: "Missing required fields: clerkUserId or email",
      };
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("⚠️ User already exists in DB:", email);
      return {
        success: false,
        status: 409,
        message: "User already exists",
        data: existingUser,
      };
    }

    // Create new user
    const newUser = await User.create({
      clerkUserId,
      name,
      email,
      phone,
      dob: dob || new Date(),
    });

    if (!newUser) {
      console.error("❌ Mongoose returned null while creating user:", email);

      //TODO: Delete from Clerk if user creation fails
      try {
        // await deleteClerkUser(clerkUserId);
      } catch (cleanupError) {
        console.error(
          "⚠️ Failed to delete Clerk user during cleanup:",
          cleanupError
        );
      }

      return {
        success: false,
        status: 500,
        message: "Unexpected error: User creation returned null",
      };
    }
    console.log("✅ User created in DB:", email);

    return {
      success: true,
      status: 201,
      message: "User successfully created",
      data: newUser,
    };
  } catch (error: any) {
    console.error("❌ Error creating user in DB:", error);

    return {
      success: false,
      status: 500,
      message: error?.message || "Failed to create user in DB",
    };
  }
};

export const fetchUserAccountDetails = async (clerkUserId: string) => {
  await connectDB();

  try {
    if (!clerkUserId) {
      return { success: false, status: 400, message: "Missing clerkUserId" };
    }

    const user = await User.findOne({ clerkUserId }).lean();

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found in DB",
      };
    }

    return { success: true, status: 200, data: user };
  } catch (error: any) {
    console.error("❌ Error fetching user:", error);
    return {
      success: false,
      status: 500,
      message: error?.message || "Failed to fetch user details",
    };
  }
};
