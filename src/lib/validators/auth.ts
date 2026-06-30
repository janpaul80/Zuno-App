import { z } from "zod";

// Register Request Schema
export const RegisterRequestSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

// Login Request Schema
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// Guest Request Schema (for anonymous users)
export const GuestRequestSchema = z.object({
  guestId: z.string().uuid().optional(),
});
export type GuestRequest = z.infer<typeof GuestRequestSchema>;
