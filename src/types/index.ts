export type PropertyStatus = 'available' | 'sold' | 'pending'
export type PropertyType = 'villa' | 'apartment' | 'office' | 'land' | 'commercial'

export interface PropertyImage {
  id?: number
  url: string
  alt?: string
  file?: File // For new uploads
}

export interface Amenity {
  id?: number
  name: string
  distance: string
}

export interface Neighborhood {
  id?: number
  description: string
}

export interface Property {
  id?: number
  slug?: string
  title: string
  status: PropertyStatus
  description: string
  type: PropertyType
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  location: string
  address: string
  year_built: number
  video_tour?: string | File | null
  neighborhood_id?: number | null
  neighborhood?: Neighborhood | null
  amenities: Amenity[]
  images: PropertyImage[]
}

export interface PropertyFormValues extends Omit<Property, 'id' | 'slug' | 'neighborhood'> {
  neighborhood: Neighborhood | null
}


// export * from './property'
// export other types if you have them