import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { Res } from "../interfaces/res";

export const createUser = async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  let service = new userService();
  let response: Res = await service.createUser(req.body);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
