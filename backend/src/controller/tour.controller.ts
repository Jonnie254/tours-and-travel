import { Request, Response } from "express";
import { TourService } from "../services/tour.service";
import { Tour } from "../interfaces/tour";

const tourService = new TourService();

export const createTour = async (req: Request, res: Response) => {
  const tour: Tour = req.body;
  const response = await tourService.createTour(tour);
  if (response.success) {
    res.status(201).json(response);
  } else {
    res.status(400).json(response);
  }
};
export const getTours = async (req: Request, res: Response) => {
  const response = await tourService.getAllTours();
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
export const getTour = async (req: Request, res: Response) => {
  const id = req.params.tour_id;
  const response = await tourService.getTour(id);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
export const deleteTour = async (req: Request, res: Response) => {
  const id = req.params.tour_id;
  const response = await tourService.deleteTour(id);
  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
