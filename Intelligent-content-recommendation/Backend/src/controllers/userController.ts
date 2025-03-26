import { Request, Response } from "express";
import UserService from "../services/userService";

const UserController = {
  async getUserProfile(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.user?.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UserController;
