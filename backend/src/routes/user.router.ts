import { Router } from "express";
import { createUser } from "../controller/user.controller";

let userRouter = Router();
userRouter.post("/create", createUser);

export default userRouter;
