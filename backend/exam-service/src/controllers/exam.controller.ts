export const createExam = async (req: any, res: any) => {
  console.log("Inside create exam");
  try {
    if (!req.user) {
      console.error("Can't get req.user:");
      return res
        .status(500)
        .json({ success: false, message: "Can't get req.user" });
    }
    console.log("GOT IT HURRAY req.user", req.user);
  } catch (error) {
    console.error("Error in creating exam:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};
