import e, { Request, Response } from "express";
import { userService } from "../services/user.service";
import { Res } from "../interfaces/res";
import { getIdFromToken } from "../helpers/getIdFromToken";

let service = new userService();

export const createUser = async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  let response: Res = await service.createUser(req.body);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    let user_id = getIdFromToken(req);
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Access denied",
        data: null,
      });
    }
    let { name, email, password } = req.body;
    let response = await service.updateUser(user_id, req.body);
    if (response.success) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  try {
    //if
    let user_id = getIdFromToken(req);
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Access denied",
        data: null,
      });
    }
    let response = await service.getOneUser(user_id);
    if (response.success) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const allUsers = async (req: Request, res: Response) => {
  let response = await service.getAllUsers();
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    let { user_id } = req.params;
    let response = await service.deleteUser(user_id);
    if (response.success) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
