// src/components/PropertyTypeTable.tsx
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyType } from "@/types/property";
import { EditTypeDialog } from "./EditTypeDialog";
import { DeleteTypeDialog } from "./DeleteTypeDialog";

export function PropertyTypeTable({
  types,
  onEdit,
  onDelete
}: {
  types: PropertyType[];
  onEdit: (id: string, data: Partial<PropertyType>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [editingType, setEditingType] = useState<PropertyType | null>(null);
  const [deletingType, setDeletingType] = useState<PropertyType | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Properties</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type) => (
            <TableRow key={type.id}>
              <TableCell className="font-medium capitalize">{type.title}</TableCell>
              <TableCell>
                {type.image ? (
                  <img src={type.image} alt={type.title} className="h-10 w-10 object-cover rounded" />
                ) : (
                  <div className="h-10 w-10 flex items-center justify-center bg-muted rounded">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{type.relatedPropertiesCount} properties</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={type.isActive ? "default" : "secondary"}>
                  {type.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingType(type)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => setDeletingType(type)}
                  disabled={type.relatedPropertiesCount > 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingType && (
        <EditTypeDialog
          type={editingType}
          open={!!editingType}
          onOpenChange={(open) => !open && setEditingType(null)}
          onSubmit={async (values) => {
            await onEdit(editingType.id, values);
            setEditingType(null);
          }}
        />
      )}

      {deletingType && (
        <DeleteTypeDialog
          type={deletingType}
          open={!!deletingType}
          onOpenChange={(open) => !open && setDeletingType(null)}
          onConfirm={async () => {
            await onDelete(deletingType.id);
            setDeletingType(null);
          }}
        />
      )}
    </>
  );
}