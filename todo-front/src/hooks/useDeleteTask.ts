import { deleteApiData } from "@/apiServices/apiServices";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteTask = (onSuccessHandler: () => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteApiData(`/tasks/${id}`),
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
    onSuccess: () => {
      onSuccessHandler();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { mutate };
};
