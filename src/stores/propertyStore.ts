import { create } from 'zustand';
import { Property } from '@/types/property';

interface PropertyStore {
  properties: Property[];
  isLoading: boolean;
  createProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  // ... other actions
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  isLoading: false,
  createProperty: async (property) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add the new property with isFeatured
      set((state) => ({
        properties: [
          ...state.properties,
          {
            ...property,
            id: Math.floor(Math.random() * 10000),
            slug: property.title.toLowerCase().replace(/\s+/g, '-'),
          },
        ],
      }));
    } finally {
      set({ isLoading: false });
    }
  },
  // ... other implementations
}));