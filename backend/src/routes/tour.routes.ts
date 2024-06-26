import { Router } from "express";
import {
  createTour,
  deleteTour,
  getTour,
  getTours,
} from "../controller/tour.controller";
import { verifyAdmin } from "../middleware/token.validation";

let tourRouter = Router();
tourRouter.post("/create", verifyAdmin, createTour);
tourRouter.get("/getall", getTours);
tourRouter.get("/get/:tour_id", getTour);
tourRouter.delete("/delete/:tour_id", verifyAdmin, deleteTour);
export default tourRouter;
