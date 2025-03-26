import { Request, Response } from "express";
import AuthService from "../services/authService";

const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const token = await AuthService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

export default AuthController;
