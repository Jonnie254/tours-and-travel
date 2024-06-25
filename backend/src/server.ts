import express from "express";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import cors from "cors";
import bodyParser from "body-parser";
import tourRouter from "./routes/tour.routes";

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/tour", tourRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
