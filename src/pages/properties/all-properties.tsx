// app/properties/page.tsx
import { useProperties } from '@/hooks/useProperties';
import { PropertyTable } from './PropertyTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export  function AllPropertiesPage() {
  const { properties, isLoading, error } = useProperties();

  return (
    <div className="container mx-auto py-8">
     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">All Properties</h1>
        <Button asChild className="gap-2">
          <Link to="/properties/new">
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </Link>
        </Button>
      </div>
      
      <PropertyTable 
        data={properties}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}