import { z } from "zod";
import { sessionPayloadSchema } from "./session";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must atleast 8 characters long" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;