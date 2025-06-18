export const extractUser = (req: any, res: any, next: any) => {
  const userHeader = req.headers["x-user"];
  if (!userHeader) {
    console.log("missing user info");
    return res.status(401).json({ message: "User info missing" });
  }

  try {
    console.log("user header", userHeader);
    
    req.user = JSON.parse(userHeader);
    console.log("req.user in extract user", req.user);
    
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid user data" });
  }
};
