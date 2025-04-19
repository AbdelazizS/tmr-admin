import { Inquiry } from "@/types";
import { sleep } from "@/lib/utils";

// Mock data
const mockInquiries: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    message: "I'm interested in the luxury apartment downtown. When can I schedule a viewing?",
    status: "pending",
    property: {
      id: "1",
      title: "Luxury Apartment Downtown",
      slug: "luxury-apartment-downtown",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    message: "Please send me more information about the office space in midtown.",
    status: "completed",
    property: {
      id: "2",
      title: "Modern Office Space Midtown",
      slug: "modern-office-space-midtown",
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  // Add more mock inquiries...
];

export const inquiryService = {
  async getInquiries(): Promise<Inquiry[]> {
    await sleep(500); // Simulate network delay
    return mockInquiries;
  },

  async getInquiryById(id: string): Promise<Inquiry | undefined> {
    await sleep(500);
    return mockInquiries.find((inquiry) => inquiry.id === id);
  },

  async updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<Inquiry> {
    await sleep(800); // Simulate slower network for mutations
    const inquiry = mockInquiries.find((i) => i.id === id);
    if (!inquiry) {
      throw new Error("Inquiry not found");
    }
    inquiry.status = status;
    inquiry.updatedAt = new Date().toISOString();
    return inquiry;
  },

  async deleteInquiry(id: string): Promise<void> {
    await sleep(800);
    const index = mockInquiries.findIndex((inquiry) => inquiry.id === id);
    if (index === -1) {
      throw new Error("Inquiry not found");
    }
    mockInquiries.splice(index, 1);
  },
};