export interface UserRegister {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}
export interface UserLogin {
  email: string;
  password: string;
}
