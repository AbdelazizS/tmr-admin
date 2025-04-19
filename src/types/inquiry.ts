export interface PropertyReference {
  id: string;
  title: string;
  slug: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "completed" | "archived";
  property?: PropertyReference;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = Inquiry["status"];

export const inquiryStatuses = {
  pending: "pending",
  completed: "completed",
  archived: "archived",
} as const;