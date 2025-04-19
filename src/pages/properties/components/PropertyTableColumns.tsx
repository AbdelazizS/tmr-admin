// PropertyTableColumns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Property } from "@/types/property"
import { Button } from "@/components/ui/button"

export const propertyTableColumns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("type")}</div>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      return <div>${price.toLocaleString()}</div>
    },
    filterFn: "inNumberRange",
  },
  {
    accessorKey: "bedrooms",
    header: "Bedrooms",
    cell: ({ row }) => row.getValue("bedrooms"),
    filterFn: "equals",
  },
  {
    accessorKey: "bathrooms",
    header: "Bathrooms",
    cell: ({ row }) => row.getValue("bathrooms"),
    filterFn: "equals",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="sm">
        View
      </Button>
    ),
  },
]