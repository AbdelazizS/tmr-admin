// hooks/useProperties.ts
import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { api } from '@/lib/api';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get('/properties');
      setProperties(response.data.data);
    } catch (err) {
      setError('Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (propertyId) => {
    // if (!propertyToDelete) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);
      
    await api.delete(`/properties/${propertyId}`);
      
      // Optimistically update the UI
      // Close the modal
    } catch (err) {
      setDeleteError('Failed to delete property');
      console.error('Error deleting property:', err);
      // Re-fetch to ensure data consistency
      await fetchProperties();
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { 
    properties, 
    isLoading, 
    error,
    fetchProperties,
    propertyToDelete,
    setPropertyToDelete,
    deleteProperty,
    isDeleting,
    deleteError,
  };
};