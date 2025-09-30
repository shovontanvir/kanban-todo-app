import { deleteApiData } from "@/apiServices/apiServices";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTask = (onSuccessHandler: () => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteApiData(`/tasks/${id}`),
    onError: () => {
      toast.error("Failed to delete task. Please try again.");
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      onSuccessHandler();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate };
};
