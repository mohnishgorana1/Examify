export const extractUser = (req: any, res: any, next: any) => {
  const userHeader = req.headers["x-user"];
  if (!userHeader) {
    return res.status(401).json({ message: "User info missing" });
  }

  try {
    req.user = JSON.parse(userHeader);
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid user data" });
  }
};
