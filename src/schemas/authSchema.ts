// src/schema/authSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema; // For now, keep them identical
export type RegisterSchema = z.infer<typeof registerSchema>;
