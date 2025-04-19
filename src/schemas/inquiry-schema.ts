import { z } from "zod";

export const inquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone must be at least 6 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  status: z.enum(["pending", "completed", "archived"]),
  propertyId: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>;