// src/components/DeleteTypeDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteTypeDialog({
  type,
  open,
  onOpenChange,
  onConfirm
}: {
  type: PropertyType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Property Type</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{type.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting || type.relatedPropertiesCount > 0}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
        {type.relatedPropertiesCount > 0 && (
          <p className="text-sm text-red-500 mt-2">
            Cannot delete type with {type.relatedPropertiesCount} associated properties
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}