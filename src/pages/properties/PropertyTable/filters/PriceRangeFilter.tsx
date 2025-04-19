// components/properties/PropertyTable/filters/PriceRangeFilter.tsx
import { Table } from '@tanstack/react-table';
import { Property } from '@/types/property';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState, useCallback } from 'react';

export function PriceRangeFilter({ table }: { table: Table<Property> }) {
  const column = table.getColumn('price');
  const currentFilter = column?.getFilterValue() as { min?: number; max?: number } | undefined;
  
  const [min, setMin] = useState<number | ''>(currentFilter?.min || '');
  const [max, setMax] = useState<number | ''>(currentFilter?.max || '');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Custom debounce implementation
  const updateFilter = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const newTimeoutId = setTimeout(() => {
      column?.setFilterValue({
        min: min !== '' ? min : undefined,
        max: max !== '' ? max : undefined,
      });
    }, 500);

    setTimeoutId(newTimeoutId);
  }, [min, max, column]);

  useEffect(() => {
    updateFilter();
    
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [min, max, updateFilter]);

  return (
    <div className="space-y-2 w-full">
      <Label className="text-xs">Price Range</Label>
      <div className="flex gap-2 w-full">
        <Input
          type="number"
          placeholder="Min price"
          value={min}
          onChange={(e) => setMin(e.target.value ? Number(e.target.value) : '')}
          className="w-full"
          min={0}
        />
        <Input
          type="number"
          placeholder="Max price"
          value={max}
          onChange={(e) => setMax(e.target.value ? Number(e.target.value) : '')}
          className="w-full"
          min={0}
        />
      </div>
    </div>
  );
}