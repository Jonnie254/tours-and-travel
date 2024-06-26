import { Request, Response } from "express";
import { UserLogin } from "../interfaces/auth";
import { authService } from "../services/authorization.service";
const auth = new authService();
export const LoginUser = async (req: Request, res: Response) => {
  try {
    const login: UserLogin = req.body;

    console.log("Login request received:", login.email);

    const response = await auth.login(login);

    if (!response.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    res.cookie("token", response.data.token, {
      httpOnly: true,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in LoginUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const isAdmin = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.params;
    let response = await auth.isAdmin(user_id);
    if (response.success) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
