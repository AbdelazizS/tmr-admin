import { useState, useEffect, useCallback } from 'react';
import { PropertyType } from '@/types/property';

export const usePropertyTypes = () => {
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Enhanced mock data matching your property mock structure
      const mockTypes: PropertyType[] = [
        {
          id: '1',
          title: 'villa',
          slug: 'villa',
          image: '/property-types/villa.jpg',
          description: 'Luxury standalone homes with private amenities',
          relatedPropertiesCount: 42,
          isActive: true,
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2023-06-20')
        },
        {
          id: '2',
          title: 'apartment',
          slug: 'apartment',
          image: '/property-types/apartment.jpg',
          description: 'Modern units in residential buildings',
          relatedPropertiesCount: 128,
          isActive: true,
          createdAt: new Date('2022-11-10'),
          updatedAt: new Date('2023-05-15')
        },
        {
          id: '3',
          title: 'office',
          slug: 'office',
          image: '/property-types/office.jpg',
          description: 'Commercial workspaces in business districts',
          relatedPropertiesCount: 56,
          isActive: true,
          createdAt: new Date('2023-03-05'),
          updatedAt: new Date('2023-07-10')
        },
        {
          id: '4',
          title: 'warehouse',
          slug: 'warehouse',
          image: '/property-types/warehouse.jpg',
          description: 'Industrial storage and logistics spaces',
          relatedPropertiesCount: 23,
          isActive: false,
          createdAt: new Date('2023-02-18'),
          updatedAt: new Date('2023-06-30')
        },
        {
          id: '5',
          title: 'land',
          slug: 'land',
          image: '/property-types/land.jpg',
          description: 'Undeveloped plots for construction',
          relatedPropertiesCount: 37,
          isActive: true,
          createdAt: new Date('2022-12-22'),
          updatedAt: new Date('2023-07-05')
        }
      ];

      setTypes(mockTypes);
    } catch (err) {
      setError('Failed to fetch property types');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createType = async (data: Omit<PropertyType, 'id' | 'relatedPropertiesCount' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newType: PropertyType = {
        ...data,
        id: Math.max(...types.map(t => parseInt(t.id))) + 1 + '',
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
        relatedPropertiesCount: 0,
        isActive: data.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setTypes(prev => [...prev, newType]);
      return newType;
    } catch (err) {
      throw new Error('Failed to create property type');
    } finally {
      setIsLoading(false);
    }
  };

  const updateType = async (id: string, data: Partial<PropertyType>) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTypes(prev => prev.map(type => 
        type.id === id ? { 
          ...type, 
          ...data, 
          updatedAt: new Date(),
          slug: data.title ? data.title.toLowerCase().replace(/\s+/g, '-') : type.slug
        } : type
      ));
    } catch (err) {
      throw new Error('Failed to update property type');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteType = async (id: string) => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const typeToDelete = types.find(t => t.id === id);
      if (typeToDelete?.relatedPropertiesCount && typeToDelete.relatedPropertiesCount > 0) {
        throw new Error('Cannot delete type with associated properties');
      }
      
      setTypes(prev => prev.filter(type => type.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete property type');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  return {
    types,
    isLoading,
    error,
    createType,
    updateType,
    deleteType,
    refetch: fetchTypes
  };
};