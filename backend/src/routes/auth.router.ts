import { Router } from "express";

import { LoginUser, isAdmin } from "../controller/auth.controller";
const authRouter = Router();
authRouter.post("/login", LoginUser);
authRouter.post("/admin/:user_id", isAdmin);

export default authRouter;
