import { PrismaClient } from "@prisma/client";
import { Tour } from "../interfaces/tour";
import { Res } from "../interfaces/res";
import { v4 as uuidv4 } from "uuid";

let prisma = new PrismaClient();

export class TourService {
  async createTour(tour: Tour): Promise<Res> {
    try {
      const tour_id = uuidv4();
      const response = await prisma.tours.create({
        data: {
          id: tour_id,
          name: tour.name,
          description: tour.description ?? "",
          price: tour.price,
          location: tour.location,
          images: tour.images, // Ensure this is a string
          startDateTime: new Date(tour.startDateTime),
          endDateTime: new Date(tour.endDateTime),
          tourType: tour.tourType,
        },
      });

      if (response?.id === tour_id) {
        return {
          success: true,
          message: "Tour created successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Tour creation failed",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      return {
        success: false,
        message: "An error occurred while creating the tour",
        data: null,
      };
    }
  }
  async getAllTours() {
    try {
      const tours = await prisma.tours.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          location: true,
          images: true,
          startDateTime: true,
          endDateTime: true,
          tourType: true,
        },
        where: {
          isDeleted: false,
        },
      });
      return {
        success: true,
        message: "Tours fetched successfully",
        data: tours,
      };
    } catch (error) {
      console.error("Error fetching tours:", error);
      return {
        success: false,
        message: "An error occurred while fetching tours",
        data: null,
      };
    }
  }
  async getTour(tour_id: string): Promise<Res> {
    try {
      const tour = await prisma.tours.findUnique({
        where: {
          id: tour_id,
        },
      });

      if (tour) {
        return {
          success: true,
          message: "Tour fetched successfully",
          data: tour,
        };
      } else {
        return {
          success: false,
          message: "Tour not found",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error fetching tour:", error);
      return {
        success: false,
        message: "An error occurred while fetching the tour",
        data: null,
      };
    }
  }
  async deleteTour(tour_id: string): Promise<Res> {
    try {
      const response = await prisma.tours.update({
        where: {
          id: tour_id,
        },
        data: {
          isDeleted: true,
        },
      });

      if (response?.id === tour_id) {
        return {
          success: true,
          message: "Tour deleted successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Tour deletion failed",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      return {
        success: false,
        message: "An error occurred while deleting the tour",
        data: null,
      };
    }
  }
}
