// src/services/inquiryService.ts
import axios from 'axios';
import { Inquiry, InquiryActivity } from '@/types/inquiry';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const inquiryService = {
  async getInquiries(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Inquiry[]; counts: Record<string, number> }> {
    const response = await axios.get(`${API_BASE_URL}/inquiries`, { params });
    return response.data;
  },

  async getInquiry(id: string): Promise<Inquiry> {
    const response = await axios.get(`${API_BASE_URL}/inquiries/${id}`);
    return response.data;
  },

  async createInquiry(data: Partial<Inquiry>): Promise<Inquiry> {
    const response = await axios.post(`${API_BASE_URL}/inquiries`, data);
    return response.data;
  },

  async updateInquiry(id: string, data: Partial<Inquiry>): Promise<Inquiry> {
    const response = await axios.patch(`${API_BASE_URL}/inquiries/${id}`, data);
    return response.data;
  },

  async getInquiryActivities(id: string): Promise<InquiryActivity[]> {
    const response = await axios.get(`${API_BASE_URL}/inquiries/${id}/activities`);
    return response.data;
  },

  async addActivity(id: string, activity: Omit<InquiryActivity, 'id' | 'createdAt'>): Promise<InquiryActivity> {
    const response = await axios.post(`${API_BASE_URL}/inquiries/${id}/activities`, activity);
    return response.data;
  },

  async updateStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
    const response = await axios.patch(`${API_BASE_URL}/inquiries/${id}/status`, { status });
    return response.data;
  },

  async exportInquiries(format: 'csv' | 'excel' = 'csv'): Promise<void> {
    const response = await axios.get(`${API_BASE_URL}/inquiries/export`, {
      params: { format },
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inquiries_${new Date().toISOString()}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};