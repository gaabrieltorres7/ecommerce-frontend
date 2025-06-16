import { RegistrationFormData } from "@/app/registration/page";
import { api } from "@/lib/api";
import { z } from "zod";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

type RegisterPayload = Omit<RegistrationFormData, "confirmPassword">;

export const registerUser = async (userData: RegisterPayload) => {
  const { data } = await api.post("/users/create", userData);
  return data;
};

export const loginUser = async (
  credentials: LoginFormData
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};
