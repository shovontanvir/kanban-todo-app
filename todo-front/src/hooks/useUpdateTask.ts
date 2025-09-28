import { putApiData } from "@/apiServices/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (onSuccessHandler: () => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payLoad: {
      id: string;
      data: { title: string; description: string; status: string };
    }) => putApiData(`/tasks/${payLoad.id}`, payLoad.data),
    onError: (error) => {
      console.error("Error updating task:", error);
    },
    onSuccess: () => {
      console.log("Task updated successfully:");
      onSuccessHandler();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate };
};
