import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "@/hooks/useDeleteTask";

const TaskDeleteConfirmationModal: React.FC<{ taskId: string }> = ({
  taskId,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate } = useDeleteTask(() => {
    setDeleteDialogOpen(false);
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Delete"
          className="text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black backdrop-blur-md border border-white/20">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete this task? This action cannot be
          undone.
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(taskId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDeleteConfirmationModal;
