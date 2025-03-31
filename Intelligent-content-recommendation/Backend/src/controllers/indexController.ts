import { Request, Response } from "express";

class IndexController {
  public getIndex = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res
        .status(200)
        .json({ message: "Welcome to the Intelligent Content Recommendation System API!" });
    } catch (error) {
      console.error("❌ Error in getIndex:", error);
      return res.status(500).json({ error: "An internal server error occurred." });
    }
  };
}

export default new IndexController();
