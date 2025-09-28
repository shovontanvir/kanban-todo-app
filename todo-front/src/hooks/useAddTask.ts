import { useMutation } from "@tanstack/react-query";
import { postApiData } from "@/apiServices/apiServices";
import type { TaskFormInputs } from "@/types/taskFormInputs";

export const useAddTask = (resetHandler: () => void) => {
  const { mutate } = useMutation({
    mutationFn: (taskPayload: TaskFormInputs) =>
      postApiData("/tasks", taskPayload),
    onError: (error) => {
      console.error("Task creation failed:", error);
      alert("Failed to add task. Please try again.");
    },
    onSuccess: () => {
      resetHandler();
      // will add task list fetch query invalidation and refetch logic later
    },
  });
  return { mutate };
};
