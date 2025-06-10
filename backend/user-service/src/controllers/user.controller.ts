import { User } from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

export const getProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("Profile", user);
    
    return res.status(201).json({ success: true, message: "User found", user });

  } catch (error) {
    console.log("error", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};
