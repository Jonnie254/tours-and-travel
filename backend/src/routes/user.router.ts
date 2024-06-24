import { Router } from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  updateUser,
  userProfile,
} from "../controller/user.controller";

let userRouter = Router();
userRouter.post("/create", createUser);
userRouter.get("/profile/:user_id", userProfile);
userRouter.put("/update/:user_id", updateUser);
userRouter.get("/all", allUsers);
userRouter.delete("/delete/:user_id", deleteUser);

export default userRouter;
