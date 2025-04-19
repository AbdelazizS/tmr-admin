import { z } from "zod";

export type PropertyStatus = 'for_rent' | 'for_sale';
export type PropertyTypes = 'villa' | 'apartment' | 'office' | 'land' | 'commercial';
export const propertyStatuses = ["for_rent", "for_sale"] as const;
// Status display mapping
export const propertyStatusLabels: Record<PropertyStatus, string> = {
  for_rent: "For Rent",
  for_sale: "For Sale"
};


export const propertyTypes = [
  "villa",
  "apartment",
  "office",
  "land",
  "commercial",
] as const;

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  isFeatured?: boolean;
}
export interface Area {
  id: string;
  name: string;
  slug: string;
  description?: string;
  featuredImage?: string;
}


export interface Amenity {
  id: string;
  name: string;
}

export interface Neighborhood {
  description: string;
  landmarks: {
    name: string;
    distance: string;
  }[];
}

export interface Property {
  id?: number;
  slug?: string;
  title: string;
  status: PropertyStatus;
  description: string;
  type: PropertyType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  district:string;
  isFeatured: boolean; // Added this line
  location: string;
  address: string;
  year_built: number;
  video_tour?: string | File | null;
  neighborhood?: Neighborhood | null;
  amenities: Amenity[];
  features: string[];
  images: PropertyImage[];
}


export interface PropertyType {
  id: string;
  title: string;
  slug: string;
  image?: string;
  description?: string;
  relatedPropertiesCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


// src/types/property.ts
export interface PropertyArea {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  propertyCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const areaFormSchema = z.object({
  name: z.string().min(2).max(50),
  image: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});

export const typeFormSchema = z.object({
  name: z.string().min(2).max(50),
  image: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true)
});

export const propertyTypeOptions = [
  'apartment',
  'villa',
  'office',
  'warehouse',
  'land',
  'commercial'
] as const;

export interface PropertyFormValues extends Omit<Property, 'id' | 'slug'> {
  neighborhood: Neighborhood | null;
}