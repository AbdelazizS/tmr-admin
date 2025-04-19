// src/services/PropertyService.ts
import axios from "axios";
import { Property } from "../types";

const API_BASE = "/api/properties"; // Use mock URL; later replace with real endpoint

export const PropertyService = {
  getProperties: async (): Promise<Property[]> => {
    // Simulated API call
    const response = await axios.get(API_BASE);
    return response.data;
  },
  getPropertyById: async (id: number): Promise<Property> => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  },
  createProperty: async (data: Property): Promise<Property> => {
    const response = await axios.post(API_BASE, data);
    return response.data;
  },
  updateProperty: async (
    id: number,
    data: Partial<Property>
  ): Promise<Property> => {
    const response = await axios.put(`${API_BASE}/${id}`, data);
    return response.data;
  },
  deleteProperty: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
