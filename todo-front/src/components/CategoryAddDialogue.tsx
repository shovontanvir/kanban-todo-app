import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/hooks/useCreateCategory";

interface CategoryFormValues {
  name: string;
}

const CategoryAddDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<CategoryFormValues>({
    defaultValues: { name: "" },
  });

  const onSuccessHandler = () => {
    reset();
    setOpen(false);
  };

  const { mutate } = useCreateCategory(onSuccessHandler);

  const onSubmit = (data: CategoryFormValues) => {
    mutate({
      name: data.name,
      keyTitle: data.name.split(" ").join("-").toLowerCase(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="button">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("name", { required: true })}
            placeholder="Category Title"
            autoFocus
          />
          <DialogFooter>
            <Button type="submit" className="button">
              Add
            </Button>
            <Button
              type="button"
              className="bg-red-800"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryAddDialog;
