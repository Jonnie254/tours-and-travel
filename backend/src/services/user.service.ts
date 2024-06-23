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
}
