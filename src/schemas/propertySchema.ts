// src/schema/propertySchema.ts
import { z } from 'zod';

export const propertySchema = z.object({
  slug: z.string().nonempty("Slug is required"),
  title: z.string().nonempty("Title is required"),
  status: z.enum(['available', 'sold', 'pending']),
  description: z.string().nonempty("Description is required"),
  type: z.string().nonempty("Type is required"),
  price: z.number().positive("Price must be positive"),
  bedrooms: z.number().int().nonnegative("Bedrooms must be non-negative"),
  bathrooms: z.number().int().nonnegative("Bathrooms must be non-negative"),
  area: z.number().int().nonnegative("Area must be non-negative"),
  location: z.string().nonempty("Location is required"),
  address: z.string().nonempty("Address is required"),
  year_built: z.number().int().min(1800, "Please provide a valid year"),
  video_tour: z.string().url().optional(),
  neighborhood_id: z.number().int().optional()
});

export type PropertySchema = z.infer<typeof propertySchema>;
