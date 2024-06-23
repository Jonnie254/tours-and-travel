import express from "express";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";

let app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
