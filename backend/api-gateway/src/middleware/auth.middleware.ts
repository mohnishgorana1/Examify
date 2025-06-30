import axios from "axios";

export const authenticateUser = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("TOKEN AT API GATEWAY", token);
  try {
    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/v1/auth/verify-token`!,
      { token }
    );
    console.log("DATA FROM AUTH SERVICE FOR TOKEN VERIFY\n", data);

    (req as any).user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
