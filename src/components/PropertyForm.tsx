// src/components/PropertyForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema, PropertySchema } from '../schemas/propertySchema';
import { toast } from 'sonner';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface PropertyFormProps {
  defaultValues?: PropertySchema;
  onSubmit: (data: PropertySchema) => void;
  loading?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ defaultValues, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PropertySchema>({
    resolver: zodResolver(propertySchema),
    defaultValues
  });

  const internalSubmit = (data: PropertySchema) => {
    onSubmit(data);
    toast.success('Property saved!');
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register('slug')} placeholder="property-slug" />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} placeholder="Property Title" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} placeholder="Detailed description" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      {/* Include additional fields for status, type, price, bedrooms, bathrooms, area, location, address, year_built, video_tour, neighborhood_id */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Property'}
      </Button>
    </form>
  );
};

export default PropertyForm;
