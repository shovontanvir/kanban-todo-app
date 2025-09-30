import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApiData } from "@/apiServices/apiServices";
import type { TaskFormInputs } from "@/types/taskFormInputs";
import { toast } from "sonner";

export const useAddTask = (resetHandler: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (taskPayload: TaskFormInputs) =>
      postApiData("/tasks", taskPayload),
    onError: () => {
      toast.error("Failed to add task. Please try again.");
    },
    onSuccess: () => {
      toast.success("Task added successfully!");
      resetHandler();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { mutate };
};
