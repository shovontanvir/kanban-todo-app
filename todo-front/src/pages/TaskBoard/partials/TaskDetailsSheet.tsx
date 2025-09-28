import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TASKTYPES } from "@/lib/consts/taskTypes";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useUpdateTask } from "@/hooks/useUpdateTask";

interface TaskDetailsSheetProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

const TaskDetailsSheet: React.FC<TaskDetailsSheetProps> = ({
  id,
  title,
  description,
  deadline,
  selectedStatus,
  setSelectedStatus,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<{
    title: string;
    description: string;
    status: string;
  }>({
    title,
    description,
    status: selectedStatus,
  });
  const [open, setOpen] = useState(false);

  const { mutate } = useUpdateTask(() => setOpen(false));

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: draft.title,
      description: draft.description,
      status: draft.status,
    },
    values: {
      title: draft.title,
      description: draft.description,
      status: draft.status,
    },
  });

  // When editing, sync draft
  const handleEdit = () => {
    setDraft({ title, description, status: selectedStatus });
    setEditMode(true);
  };

  // Save the changes in the BE if saved
  const handleSave = (data: {
    title: string;
    description: string;
    status: string;
  }) => {
    setDraft(data);
    setEditMode(false);
    setSelectedStatus(data.status);
    mutate({ id, data });
  };

  // when cancelled draft will be cleared
  const handleCancel = () => {
    setDraft({ title, description, status: selectedStatus });
    setEditMode(false);
    reset({ title, description, status: selectedStatus });
  };

  // in edit mode, update draft or set new status
  const handleStatusChange = (value: string) => {
    if (editMode) {
      setDraft((prev) => ({ ...prev, status: value }));
      setSelectedStatus(value);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          See Details
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md w-full bg-black p-5 ">
        <SheetHeader>
          <div className="flex items-center justify-between">
            {editMode ? (
              <SheetTitle>
                <Input
                  {...register("title")}
                  value={draft.title}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="text-3xl font-bold capitalize bg-transparent border-none p-0 h-auto text-white"
                  style={{ fontSize: "1.75rem" }}
                />
              </SheetTitle>
            ) : (
              <SheetTitle className="text-3xl font-bold capitalize">
                {draft.title}
              </SheetTitle>
            )}
            <div className="flex gap-2 ml-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleEdit}
                disabled={editMode}
                aria-label="Edit"
              >
                <Pencil className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Delete">
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        <div className="mt-4">
          {editMode ? (
            <form
              onSubmit={handleSubmit(handleSave)}
              className="flex flex-col gap-4"
              autoComplete="off"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Task Description
                </label>
                <Input
                  {...register("description")}
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="capitalize"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Task Type</label>
                <Select
                  value={draft.status}
                  onValueChange={handleStatusChange}
                  disabled={false}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black">
                    {TASKTYPES.map((type) => (
                      <SelectItem key={type.keyTitle} value={type.keyTitle}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>{deadline}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-base mb-4 capitalize">{draft.description}</p>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Task Type</label>
                <Select value={draft.status} disabled>
                  <SelectTrigger className="w-full" disabled>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black">
                    {TASKTYPES.map((type) => (
                      <SelectItem key={type.keyTitle} value={type.keyTitle}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>{deadline}</span>
              </div>
            </>
          )}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailsSheet;
