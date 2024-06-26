import { Router } from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  updateUser,
  userProfile,
} from "../controller/user.controller";
import { verifyAdmin, verifyToken } from "../middleware/token.validation";

let userRouter = Router();
userRouter.post("/create", createUser);
userRouter.get("/profile", verifyToken, userProfile);
userRouter.put("/update/:user_id", verifyToken, updateUser);
userRouter.get("/all", verifyToken, verifyAdmin, allUsers);
userRouter.delete("/delete/:user_id", verifyToken, verifyAdmin, deleteUser);

export default userRouter;
