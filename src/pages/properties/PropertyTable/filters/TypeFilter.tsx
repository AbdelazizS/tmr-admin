// components/properties/PropertyTable/filters/TypeFilter.tsx
import { Table } from '@tanstack/react-table';
import { Property, PropertyType } from '@/types/property';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
];

export function TypeFilter({ table }: { table: Table<Property> }) {
  return (
    <Select
      value={(table.getColumn('type')?.getFilterValue() as string) ?? 'all'}
      onValueChange={(value) => {
        table.getColumn('type')?.setFilterValue(value === 'all' ? undefined : value);
      }}
    >
      <SelectTrigger  className="w-full">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        {typeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}