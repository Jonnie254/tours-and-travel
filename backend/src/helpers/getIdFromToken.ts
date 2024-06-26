import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const getIdFromToken = (req: Request): string => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return "";
    }
    const response: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (typeof response === "string") {
      return "";
    } else if (response["id"] && response.id) {
      return response.id;
    } else {
      return "";
    }
  } catch (error: any) {
    return "";
  }
};
