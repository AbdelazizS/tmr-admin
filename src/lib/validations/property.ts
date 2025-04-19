// src/lib/validations/property.ts
import { z } from "zod"

export const propertyFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["apartment", "office", "villa", "land"]),
  status: z.enum(["for-sale", "for-rent", "sold", "rented"]),
  price: z.number().min(0, "Price must be positive"),
  bedrooms: z.number().min(0, "Bedrooms must be positive"),
  bathrooms: z.number().min(0, "Bathrooms must be positive"),
  area: z.number().min(1, "Area must be positive"),
  location: z.string().min(1, "Location is required"),
  address: z.string().min(1, "Address is required"),
  year_built: z.number().nullable().optional(),
  video_tour: z.union([z.instanceof(File), z.string()]).nullable().optional(),
  images: z.array(z.union([z.instanceof(File), z.object({
    url: z.string(),
    alt: z.string().optional(),
  })])).min(1, "At least one image is required"),
  neighborhood_id: z.number().min(1, "Neighborhood is required"),
})