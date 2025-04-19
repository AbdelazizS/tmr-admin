// components/properties/PropertyTable/index.tsx
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Property } from '@/types/property';
import { columns } from './columns';
import { StatusFilter } from './filters/StatusFilter';
import { TypeFilter } from './filters/TypeFilter';
import { PriceRangeFilter } from './filters/PriceRangeFilter';
import { BedBathFilter } from './filters/BedBathFilter';
import { PropertySkeleton } from '../PropertySkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyTableProps {
  data: Property[];
  isLoading: boolean;
  error: string | null;
}

export function PropertyTable({ data, isLoading, error }: PropertyTableProps) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
        priceRange: (row, columnId, filterValue) => {
          const price = row.getValue(columnId) as number;
          const min = filterValue?.min ?? Number.MIN_SAFE_INTEGER;
          const max = filterValue?.max ?? Number.MAX_SAFE_INTEGER;
          return price >= min && price <= max;
        },
      },
  });

  if (isLoading) {
    return <PropertySkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
  <div className="space-y-2 col-span-2">
    <Label className="text-xs">Search</Label>
    <Input
      placeholder="Search properties..."
      value={globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
      className="w-full"
    />
  </div>
  
  <div className="space-y-2">
    <Label className="text-xs">Status</Label>
    <StatusFilter table={table} />
  </div>
  
  <div className="space-y-2">
    <Label className="text-xs">Type</Label>
    <TypeFilter table={table} />
  </div>
  
  <div className="space-y-2 col-span-1 sm:col-span-2">
    <PriceRangeFilter table={table} />
  </div>
  
  <div className="space-y-2">
    <Label className="text-xs">Bedrooms</Label>
    <BedBathFilter table={table} type="bedrooms" />
  </div>
  
  <div className="space-y-2">
    <Label className="text-xs">Bathrooms</Label>
    <BedBathFilter table={table} type="bathrooms" />
  </div>
</div>

{/* Reset button below the filters */}
<div className="flex justify-end w-full">
  <Button
    variant="outline"
    size="sm"
    onClick={() => {
      table.resetColumnFilters();
      setGlobalFilter('');
    }}
    className="mt-2"
  >
    Reset Filters
  </Button>
</div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center space-x-2 ">
          <span className="text-sm text-gray-600 w-full ">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}