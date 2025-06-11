export const createExam = async (req: any, res: any) => {
  try {
    
  } catch (error) {
    console.error("Error in creating exam:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};
