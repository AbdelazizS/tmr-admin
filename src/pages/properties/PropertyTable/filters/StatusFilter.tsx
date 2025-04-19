// components/properties/PropertyTable/filters/StatusFilter.tsx
import { Table } from '@tanstack/react-table';
import { Property, PropertyStatus } from '@/types/property';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'for_sale', label: 'For Sale' },
  { value: 'for_rent', label: 'For Rent' },
];

export function StatusFilter({ table }: { table: Table<Property> }) {
  return (
    <Select
      value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
      onValueChange={(value) => {
        table.getColumn('status')?.setFilterValue(value === 'all' ? undefined : value);
      }}
    >
      <SelectTrigger  className="w-full">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}