import mongoose from "mongoose";
import { User } from "../models/user.model";

export const registerUser = async (
  userId: string,
  name: string,
  email: string,
  phone: string,
  dob: string,
  role: string,
  isVerified: boolean
) => {

  const existing = await User.findOne({ _id: userId });
  if (existing) {
    console.log("⚠️ User already exists in user-service DB.");
    return;
  }
  try {
    // Insert into MongoDB
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(userId), // _id already generated by auth
      userId: userId,
      name: name,
      email: email,
      phone: phone,
      dob: dob,
      role: role,
      // add other fields here
    });

    await newUser.save();

    if (!newUser) {
      console.log("Error Creating User in Users Database");
      return {
        success: false,
        message: "❌ Error Creating User in Users Database",
      };
    }
    console.log("✅ User saved in user-service DB", newUser);
    return {
      success: true,
      message: "✅ User saved in user-service DB",
    };
  } catch (err) {
    console.error("❌ Error processing Kafka message:", err);
  }
};
