import { User } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

export const createProfile = async (req: any, res: any) => {
  const { userId, name, email, phone, dob, role, isVerified } = req.body;
  try {
    console.log(
      "Register user profile req",
      userId,
      name,
      email,
      phone,
      dob,
      role,
      isVerified
    );

    if (
      !userId ||
      !name ||
      !email ||
      !phone ||
      !dob ||
      !role ||
      isVerified === undefined
    ) {
      return res.status(500).json({
        success: false,
        message: "Missing Required Fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      userId,
      name,
      email,
      phone,
      dob,
      role,
      isVerified,
    });
    await newUser.save();

    console.log("new User", newUser);

    return res
      .status(201)
      .json({ success: true, message: "User Profile Made", user: newUser });
  } catch (error) {
    console.log("error creating user profile", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

export const getProfile = async (req: any, res: any) => {
  console.log("inside getProfile");
  
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // console.log("Profile", user);

    return res.status(201).json({ success: true, message: "User found", user });
  } catch (error) {
    console.log("error", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

export const fetchUsers = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role === "student") {
      return res.status(500).json({
        success: false,
        message: "Students can't ask for bulk users profiles data",
      });
    }

    const { studentIds } = req.body;
    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student IDs are required and should be a non-empty array",
      });
    }

    const users = await User.find({
      _id: { $in: studentIds },
    });
    if (!users) {
      return res
        .status(500)
        .json({ success: false, message: "No Users found" });
    }

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    console.log("Error in fetchUsers", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};
