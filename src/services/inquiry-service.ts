import { Inquiry } from "@/types/inquiry";

// Enhanced mock data
export const fetchInquiries = async (): Promise<Inquiry[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      message: "I'm interested in the luxury apartment downtown. When can I schedule a viewing?",
      status: "pending",
      property: {
        id: 1,
        title: "Luxury Apartment Downtown",
        slug: "luxury-apartment-downtown",
      },
      createdAt: "2023-05-15T10:00:00Z",
      updatedAt: "2023-05-15T10:00:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      message: "Please send me more information about the office space in midtown.",
      status: "completed",
      property: {
        id: 2,
        title: "Modern Office Space Midtown",
        slug: "modern-office-space-midtown",
      },
      createdAt: "2023-05-14T09:30:00Z",
      updatedAt: "2023-05-14T15:45:00Z",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 (555) 456-7890",
      message: "What are the available payment plans for the beachfront villa?",
      status: "pending",
      property: {
        id: 3,
        title: "Beachfront Villa",
        slug: "beachfront-villa",
      },
      createdAt: "2023-05-16T14:20:00Z",
      updatedAt: "2023-05-16T14:20:00Z",
    },
  ];
};