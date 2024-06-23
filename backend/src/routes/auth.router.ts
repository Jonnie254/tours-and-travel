import { Router } from "express";

import { LoginUser } from "../controller/auth.controller";
const authRouter = Router();
authRouter.post("/login", LoginUser);

export default authRouter;
