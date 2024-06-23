import { Router } from "express";
import { createUser, updateUser } from "../controller/user.controller";

let userRouter = Router();
userRouter.post("/create", createUser);
userRouter.put("/update/:user_id", updateUser);

export default userRouter;
