// components/properties/PropertyTable/filters/BedBathFilter.tsx
import { Table } from '@tanstack/react-table';
import { Property } from '@/types/property';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const options = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

export function BedBathFilter({ 
  table, 
  type 
}: { 
  table: Table<Property>; 
  type: 'bedrooms' | 'bathrooms' 
}) {
  return (
    <Select
      value={(table.getColumn(type)?.getFilterValue() as string) ?? 'any'}
      onValueChange={(value) => {
        table.getColumn(type)?.setFilterValue(value === 'any' ? undefined : value);
      }}
    >
      <SelectTrigger  className="w-full">
        <SelectValue placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}