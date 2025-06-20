import jwt from "jsonwebtoken";
import { AuthUser } from "../models/AuthUser.model";

export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // attach user to request

    const user = await AuthUser.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Authenticated User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("403 Errror", error);
    
    return res.status(403).json({ message: "Invalid or expired token", error:error });
  }
};
