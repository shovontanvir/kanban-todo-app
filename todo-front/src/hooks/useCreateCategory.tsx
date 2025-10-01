import { postApiData } from "@/apiServices/apiServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = (onSuccessHandler: () => void) => {
  const { mutate } = useMutation({
    mutationFn: (payload: { name: string; keyTitle: string }) =>
      postApiData("/categories", payload),
    onError: () => {
      toast.error("Failed to create category. Please try again.");
    },
    onSuccess: () => {
      toast.success("Category created successfully!");
      onSuccessHandler();
    },
  });

  return { mutate };
};
