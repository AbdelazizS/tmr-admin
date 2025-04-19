// src/pages/properties/areas/AreaTable.tsx
const columns: ColumnDef<PropertyArea>[] = [
    {
      accessorKey: "name",
      header: "Area Name",
      cell: ({ row }) => <span className="capitalize">{row.getValue("name")}</span>
    },
    {
      accessorKey: "propertyCount",
      header: "Properties",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("propertyCount")}</Badge>
      )
    },
    // Add more columns as needed
  ];
  
  export function AreaTable({ areas }: { areas: PropertyArea[] }) {
    const [editingArea, setEditingArea] = useState<PropertyArea | null>(null);
    const [deletingArea, setDeletingArea] = useState<PropertyArea | null>(null);
  
    return (
      <>
        <GenericTable
          data={areas}
          columns={columns}
          onEdit={setEditingArea}
          onDelete={setDeletingArea}
        />
        
        {editingArea && (
          <EditDialog
            item={editingArea}
            schema={areaFormSchema}
            onClose={() => setEditingArea(null)}
            onSubmit={handleUpdateArea}
          />
        )}
        
        {deletingArea && (
          <DeleteDialog
            item={deletingArea}
            onClose={() => setDeletingArea(null)}
            onConfirm={handleDeleteArea}
          />
        )}
      </>
    );
  }