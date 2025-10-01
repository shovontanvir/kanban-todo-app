import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import type { TaskFormInputs } from "@/types/taskFormInputs";
import { useAddTask } from "@/hooks/useAddTask";

type TaskAddDialogProps = {
  categories: Array<{
    name: string;
    keyTitle: string;
  }>;
};

const TaskAddDialog: React.FC<TaskAddDialogProps> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TaskFormInputs>({
    defaultValues: {
      deadline: null,
    },
  });

  const resetHandler = () => {
    reset();
    setOpen(false);
  };

  const { mutate } = useAddTask(resetHandler);

  const onSubmit = (data: TaskFormInputs) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-auto ml-5">
        <Button className="button">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="bg-black backdrop-blur-md border border-white/20 space-y-4">
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="task-title" className="mb-2">
              Task Title
            </Label>
            <Input
              id="task-title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter task title"
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="task-desc" className="mb-2">
              Task Description
            </Label>
            <Input
              id="task-desc"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter task description"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="task-category" className="mb-2">
              Category
            </Label>
            <Controller
              control={control}
              name="status"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" id="task-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-white">
                    {categories.map((cat) => (
                      <SelectItem key={cat.keyTitle} value={cat.keyTitle}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <span className="text-red-500 text-xs">
                {errors.status.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="task-deadline" className="mb-2">
              Deadline
            </Label>
            <Controller
              control={control}
              name="deadline"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="button w-full">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAddDialog;
