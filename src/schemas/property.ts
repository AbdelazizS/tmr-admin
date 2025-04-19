import { z } from "zod";

const amenitySchema = z.object({
  name: z.string().min(1, "Amenity name is required"),
  distance: z.string().min(1, "Distance is required"),
});

const landmarkSchema = z.object({
  name: z.string().min(1, "Landmark name is required"),
  distance: z.string().min(1, "Distance is required"),
});

const neighborhoodSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  landmarks: z.array(landmarkSchema).optional(),
});

export const propertyFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  status: z.enum(["for_rent", "for_sale"]),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.enum(["villa", "apartment", "office", "land", "commercial"]),
  price: z.number().min(0, "Price cannot be negative"),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative").int(),
  bathrooms: z.number().min(0, "Bathrooms cannot be negative").int(),
  area: z.number().min(1, "Area must be at least 1 sqm"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  is_featured: z.boolean().default(false), // Added this line
  district: z
    .string()
    .min(3, "District must be at least 3 characters")
    .max(50, "District name cannot exceed 50 characters")
    .regex(
      /^[A-Za-z0-9\s\-',.]+$/,
      "Only letters, numbers, spaces and basic punctuation allowed"
    )
    .transform((str) => str.replace(/\s+/g, " ").trim()), // Normalize whitespace
  address: z.string().min(5, "Address must be at least 5 characters"),
  year_built: z
    .number()
    .min(1800, "Year built must be after 1800")
    .max(new Date().getFullYear()),
    video_tour: z
    .union([
      z
        .instanceof(File)
        .refine((file) => file.size <= 20_000_000, {
          message: "Video must be 20MB or less",
        }),
      z.string(), // for previously uploaded video URLs
    ])
    .optional()
    .nullable(),
    neighborhood: neighborhoodSchema.optional().nullable(),
  amenities: z.array(amenitySchema).min(1, "At least one amenity is required"),
  features: z.array(z.string().min(2, "Feature cannot be empty")).optional(),
  images: z
    .array(
      z.object({
        url: z.string().optional(),
        alt: z.string().optional(),
        file: z.instanceof(File).optional(),
      })
    )
    .min(1, "At least one image is required"),
});

export type PropertyFormSchema = z.infer<typeof propertyFormSchema>;
