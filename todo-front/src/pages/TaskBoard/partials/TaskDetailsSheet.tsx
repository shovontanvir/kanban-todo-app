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
import { Calendar as CalendarIcon, Pencil } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import TaskDeleteConfirmationModal from "./TaskDeleteConfirmationModal";

interface TaskDetailsSheetProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  categories: Array<{ _id: string; keyTitle: string; name: string }>;
}

const TaskDetailsSheet: React.FC<TaskDetailsSheetProps> = ({
  id,
  title,
  description,
  deadline,
  selectedStatus,
  setSelectedStatus,
  categories,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<{
    title: string;
    description: string;
    status: string;
    deadline: Date | null;
  }>({
    title,
    description,
    status: selectedStatus,
    deadline: deadline ? new Date(deadline) : null,
  });
  const [open, setOpen] = useState(false);

  const { mutate } = useUpdateTask(() => setOpen(false));

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: draft.title,
      description: draft.description,
      status: draft.status,
      deadline: draft.deadline,
    },
    values: {
      title: draft.title,
      description: draft.description,
      status: draft.status,
      deadline: draft.deadline,
    },
  });

  // When editing, sync draft
  const handleEdit = () => {
    setDraft({
      title,
      description,
      status: selectedStatus,
      deadline: deadline ? new Date(deadline) : null,
    });
    setEditMode(true);
  };

  // Save the changes in the BE if saved
  const handleSave = (data: {
    title: string;
    description: string;
    status: string;
    deadline: Date | null;
  }) => {
    setDraft(data);
    setEditMode(false);
    setSelectedStatus(data.status);
    mutate({ id, data });
  };

  // when cancelled draft will be cleared
  const handleCancel = () => {
    setDraft({
      title,
      description,
      status: selectedStatus,
      deadline: deadline ? new Date(deadline) : null,
    });
    setEditMode(false);
    reset({
      title,
      description,
      status: selectedStatus,
      deadline: deadline ? new Date(deadline) : null,
    });
  };

  // in edit mode, update draft or set new status
  const handleStatusChange = (value: string) => {
    if (editMode) {
      setDraft((prev) => ({ ...prev, status: value }));
      setSelectedStatus(value);
    }
  };

  // handle deadline change
  const handleDeadlineChange = (date: Date | undefined) => {
    if (editMode) {
      setDraft((prev) => ({ ...prev, deadline: date ?? null }));
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
              <TaskDeleteConfirmationModal taskId={id} />
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
                    {categories.map((type) => (
                      <SelectItem key={type.keyTitle} value={type.keyTitle}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CalendarIcon className="w-4 h-4" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {draft.deadline
                        ? format(draft.deadline, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-black">
                    <Calendar
                      mode="single"
                      required={true}
                      selected={draft.deadline ?? undefined}
                      onSelect={handleDeadlineChange}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" className="flex-1 bg-white text-black">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  className="flex-1 border border-white text-white"
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
                    {categories.map((type) => (
                      <SelectItem key={type.keyTitle} value={type.keyTitle}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {draft.deadline
                    ? format(draft.deadline, "PPP")
                    : "No deadline"}
                </span>
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
