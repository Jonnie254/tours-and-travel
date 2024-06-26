import { PrismaClient } from "@prisma/client";
import { Res } from "../interfaces/res";
import { UserLogin } from "../interfaces/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class authService {
  async login(userLogins: UserLogin): Promise<Res> {
    try {
      console.log("Searching for user:", userLogins.email);
      const user = await prisma.user.findUnique({
        where: {
          email: userLogins.email,
        },
      });

      if (!user) {
        console.log("User not found");
        return {
          success: false,
          message: "invalid password or email",
          data: null,
        };
      }

      const passwordMatch = bcrypt.compareSync(
        userLogins.password,
        user.password
      );

      if (!passwordMatch) {
        console.log("Password mismatch");
        return {
          success: false,
          message: "invalid password or email",
          data: null,
        };
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      console.log("User authenticated successfully");
      return {
        success: true,
        message: "login successful",
        data: { role: user.role, token, id: user.id },
      };
    } catch (error) {
      console.error("Error during login:", error);
      return {
        success: false,
        message: "Internal server error",
        data: null,
      };
    }
  }
  async isAdmin(user_id: string): Promise<Res> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });
      if (user?.role === "admin") {
        return {
          success: true,
          message: "User is an admin",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "User is not an admin",
          data: null,
        };
      }
    } catch (error) {
      console.error("Error in isAdmin:", error);
      return {
        success: false,
        message: "User is not an admin",
        data: null,
      };
    } finally {
      await prisma.$disconnect();
    }
  }
}
