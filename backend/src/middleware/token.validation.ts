import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied", data: null });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error: any) {
    res.clearCookie("token");
    return res
      .status(400)
      .json({ success: false, message: "Invalid token", data: null });
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied", data: null });
  }
  try {
    const response: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (typeof response === "string") {
      return res
        .status(401)
        .json({ success: false, message: "Access denied", data: null });
    } else if (response["role"] && response.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Access denied", data: null });
    }

    next();
  } catch (error: any) {
    res.clearCookie("token");
    return res
      .status(400)
      .json({ success: false, message: "Invalid token", data: null });
  }
};
