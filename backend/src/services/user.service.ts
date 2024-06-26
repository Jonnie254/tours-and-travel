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
      await prisma.user.create({
        data: {
          id: user_id,
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
        },
      });
      return {
        success: true,
        message: "Account created successfully",
        data: null,
      };
    } catch (error: any) {
      if (error.message.contains("Unique constraint failed")) {
        return {
          success: false,
          message: "Email or phone in use",
          data: null,
        };
      }
      return {
        success: false,
        message: "Account creation failed: ",
        data: null,
      };
    } finally {
      await prisma.$disconnect();
    }
  }
  async getAllUsers(): Promise<Res> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await prisma.user.findMany({
          where: {
            role: "user",
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
        if (users) {
          resolve({
            success: true,
            message: "Users found",
            data: users,
          });
        } else {
          resolve({
            success: false,
            message: "No users found",
            data: null,
          });
        }
      } catch (error) {
        console.error("Error in getAllUsers:", error);
        resolve({
          success: false,
          message: "No users found",
          data: null,
        });
      } finally {
        await prisma.$disconnect();
      }
    });
  }
  async getOneUser(user_id: string): Promise<Res> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: user_id,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
        if (user) {
          resolve({
            success: true,
            message: "User found",
            data: user,
          });
        } else {
          resolve({
            success: false,
            message: "User not found",
            data: null,
          });
        }
      } catch (error) {
        console.error("Error in getOneUser:", error);
        resolve({
          success: false,
          message: "User not found",
          data: null,
        });
      } finally {
        await prisma.$disconnect();
      }
    });
  }
  async updateUser(user_id: string, newUser: UserRegister): Promise<Res> {
    try {
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
      let updatedUserData: any = {
        name: newUser.name || current_details.name,
        email: newUser.email || current_details.email,
      };

      if (newUser.password) {
        updatedUserData.password = bcrypt.hashSync(newUser.password, 6);
      } else {
        updatedUserData.password = current_details.password;
      }
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
  async deleteUser(user_id: string): Promise<Res> {
    try {
      const user = await prisma.user.delete({
        where: {
          id: user_id,
        },
      });
      if (user) {
        return {
          success: true,
          message: "User deleted successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "User deletion failed",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in deleteUser:", error);
      return {
        success: false,
        message: "User deletion failed",
        data: null,
      };
    } finally {
      await prisma.$disconnect();
    }
  }
}
