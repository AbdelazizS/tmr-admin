// PropertyFilters.tsx
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { type ColumnFiltersState } from '@tanstack/react-table'

interface PropertyFiltersProps {
  columnFilters: ColumnFiltersState
  setColumnFilters: (filters: ColumnFiltersState) => void
  globalFilter: string
  setGlobalFilter: (filter: string) => void
}

export const PropertyFilters = ({ 
  columnFilters,
  setColumnFilters,
  globalFilter,
  setGlobalFilter
}: PropertyFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false)

  const updateColumnFilter = (columnId: string, value: string) => {
    setColumnFilters(prev => 
      prev.filter(f => f.id !== columnId).concat(value ? { id: columnId, value } : [])
    )
  }

  const getFilterValue = (columnId: string) => {
    return columnFilters.find(f => f.id === columnId)?.value as string || ''
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-9"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {showFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={getFilterValue('status')}
              onValueChange={(value) => updateColumnFilter('status', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Statuses</SelectItem>
                <SelectItem value="for-sale">For Sale</SelectItem>
                <SelectItem value="for-rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={getFilterValue('type')}
              onValueChange={(value) => updateColumnFilter('type', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Types</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filters */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Min Price</label>
            <Input
              type="number"
              placeholder="Min"
              value={getFilterValue('minPrice')}
              onChange={(e) => updateColumnFilter('minPrice', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Price</label>
            <Input
              type="number"
              placeholder="Max"
              value={getFilterValue('maxPrice')}
              onChange={(e) => updateColumnFilter('maxPrice', e.target.value)}
            />
          </div>

          {/* Bedrooms Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Select
              value={getFilterValue('bedrooms')}
              onValueChange={(value) => updateColumnFilter('bedrooms', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Any Bedrooms</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bathrooms</label>
            <Select
              value={getFilterValue('bathrooms')}
              onValueChange={(value) => updateColumnFilter('bathrooms', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>Any Bathrooms</SelectItem>
                <SelectItem value="1">1 Bathroom</SelectItem>
                <SelectItem value="2">2 Bathrooms</SelectItem>
                <SelectItem value="3">3 Bathrooms</SelectItem>
                <SelectItem value="4">4+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-4 flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setColumnFilters([])
                setGlobalFilter('')
              }}
            >
              Reset
            </Button>
            <Button onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}