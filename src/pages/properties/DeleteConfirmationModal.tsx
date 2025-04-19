// components/properties/DeleteConfirmationModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProperties } from "@/hooks/useProperties";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DeleteConfirmationModalProps {
  property: Property | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  error?: string | null;
}

export function DeleteConfirmationModal({
  property,
  onClose,
  error,
}: DeleteConfirmationModalProps) {
  if (!property) return null;
  const { deleteProperty, isDeleting, fetchProperties } = useProperties();
  const navigate = useNavigate();
  const deleteAction = (id) => {
    console.log(id);
    deleteProperty(id)
      .then((res) => {
        console.log(res);
        navigate('/properties')
        window.location.reload();
        toast.success("Property deleted successfully");
      })
      .catch((error) => {});
  };
  return (
    <Dialog onOpenChange={onClose}>
      <DialogTrigger>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Property Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the property "{property.title}"?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <DialogFooter>
          <DialogClose>
            <Button variant="outline" onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            // variant="destructive"
            onClick={() => deleteAction(property.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
