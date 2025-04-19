// components/properties/PropertyTable/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Property, PropertyStatus, PropertyType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";

export const statusVariantMap: Record<PropertyStatus, string> = {
  for_sale: "bg-green-100 text-green-800",
  for_rent: "bg-blue-100 text-blue-800",
};

const typeVariantMap: Record<PropertyType, string> = {
  villa: "bg-purple-100 text-purple-800",
  apartment: "bg-yellow-100 text-yellow-800",
  land: "bg-gray-100 text-gray-800",
  office: "bg-purple-100 text-purple-800",
};

// First define a type formatter utility function
const formatPropertyType = (type: string): string => {
  // First handle status-like types (for_rent, for_sale)
  if (type.startsWith("for_")) {
    return type
      .replace("for_", "For ")
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Handle camelCase
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Then handle regular types (villa, apartment)
  return type
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "id",
    header: "Id",
    // cell: ({ row }) => (
    //   <img
    //     src={row.original.images[0] || '/placeholder.jpg'}
    //     alt={row.original.images[0] || 'Property thumbnail'}
    //     className="w-48 h-48 object-cover rounded"
    //   />
    // ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{row.original.title}</p>
        <p className="text-sm text-gray-500">{row.original.location}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusVariantMap[row.original.status]
        }`}
      >
        {row.original.status === "for_sale" ? "For Sale" : "For Rent"}
      </span>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          typeVariantMap[row.original.type]
        }`}
      >
        {row.original.type.charAt(0).toUpperCase() +
          row.original.type.slice(1)}
      </span>
    ),
    filterFn: "equals",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AED",
        currencyDisplay: "symbol", // or 'code' or 'name'
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(row.original.price),
    filterFn: "priceRange",
  },
  {
    accessorKey: "bedrooms",
    header: "Bedrooms",
    cell: ({ row }) => row.original.bedrooms,
  },
  {
    accessorKey: "bathrooms",
    header: "Bathrooms",
    cell: ({ row }) => row.original.bathrooms,
  },
  {
    accessorKey: "area",
    header: "Area (sqft)",
    cell: ({ row }) => new Intl.NumberFormat("en-US").format(row.original.area),
  },
  // {
  //   accessorKey: 'created_at',
  //   header: 'Date Added',
  //   cell: ({ row }) => (
  //     new Date(row.original.created_at).toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //     })
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <DeleteConfirmationModal property={row.original} />,
  },
];
