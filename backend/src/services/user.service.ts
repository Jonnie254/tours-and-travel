import { PrismaClient } from "@prisma/client";
import { UserRegister } from "../interfaces/auth";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Res } from "../interfaces/res";
let prisma = new PrismaClient();

export class userService {
  async createUser(user: UserRegister): Promise<Res> {
    try {
      const user_id = uuidv4();
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      const response = await prisma.user.create({
        data: {
          id: user_id,
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        },
      });

      if (response?.id === user_id) {
        return {
          success: true,
          message: "Account created successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Account creation failed",
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Account creation failed: ",
        data: null,
      };
    } finally {
      await prisma.$disconnect();
    }
  }
  async updateUser(user_id: string, newUser: UserRegister): Promise<Res> {
    try {
      // Retrieve current user details by id
      const current_details = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!current_details) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }

      // Prepare updated user data
      let updatedUserData: any = {
        name: newUser.name || current_details.name,
        email: newUser.email || current_details.email,
      };

      if (newUser.password) {
        updatedUserData.password = bcrypt.hashSync(newUser.password, 6);
      } else {
        updatedUserData.password = current_details.password; // Keep existing password if not provided
      }

      // Perform the update operation
      const updatedUser = await prisma.user.update({
        where: {
          id: user_id,
        },
        data: updatedUserData,
      });

      if (updatedUser) {
        return {
          success: true,
          message: "User updated successfully",
          data: updatedUser,
        };
      } else {
        return {
          success: false,
          message: "User update failed",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in updateUser:", error);
      return {
        success: false,
        message: "User update failed",
        data: null,
      };
    } finally {
      await prisma.$disconnect();
    }
  }
}
