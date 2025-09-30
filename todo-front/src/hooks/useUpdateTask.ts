import { putApiData } from "@/apiServices/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTask = (onSuccessHandler: () => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payLoad: {
      id: string;
      data: { title: string; description: string; status: string };
    }) => putApiData(`/tasks/${payLoad.id}`, payLoad.data),
    onError: () => {
      toast.error("Error updating task:");
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      onSuccessHandler();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate };
};
