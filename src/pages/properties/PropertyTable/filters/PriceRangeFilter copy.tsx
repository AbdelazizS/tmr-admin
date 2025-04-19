// components/properties/PropertyTable/filters/PriceRangeFilter.tsx
import { Table } from '@tanstack/react-table';
import { Property } from '@/types/property';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export function PriceRangeFilter({ table }: { table: Table<Property> }) {
  const column = table.getColumn('price');
  const currentFilter = column?.getFilterValue() as { min?: number; max?: number } | undefined;
  
  const [min, setMin] = useState<number | ''>(currentFilter?.min || '');
  const [max, setMax] = useState<number | ''>(currentFilter?.max || '');

  // Debounce the filter updates
  const updateFilter = debounce(() => {
    column?.setFilterValue({
      min: min !== '' ? min : undefined,
      max: max !== '' ? max : undefined,
    });
  }, 500);

  useEffect(() => {
    updateFilter();
    return () => updateFilter.cancel();
  }, [min, max]);

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
        />
        <Input
          type="number"
          placeholder="Max price"
          value={max}
          onChange={(e) => setMax(e.target.value ? Number(e.target.value) : '')}
          className="w-full"
        />
      </div>
    </div>
  );
}