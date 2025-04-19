import { useState, useEffect } from 'react';
import { Inquiry, InquiryStatus } from '@/types/inquiry';
import { fetchInquiries } from '@/services/inquiry-service';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inquiries on mount
  useEffect(() => {
    const loadInquiries = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInquiries();
        setInquiries(data);
      } catch (err) {
        setError('Failed to fetch inquiries');
      } finally {
        setIsLoading(false);
      }
    };

    loadInquiries();
  }, []);

  // Update inquiry status
  const updateStatus = async (id: number, status: InquiryStatus) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === id ? { ...inquiry, status, updatedAt: new Date().toISOString() } : inquiry
      ));
    } catch (err) {
      setError('Failed to update inquiry status');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete inquiry
  const deleteInquiry = async (id: number) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    } catch (err) {
      setError('Failed to delete inquiry');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inquiries,
    isLoading,
    error,
    updateStatus,
    deleteInquiry
  };
};