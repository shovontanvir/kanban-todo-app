import { postApiData } from "@/apiServices/apiServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignUp = (onSuccessHandler: () => void) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (userData: { name: string; email: string; password: string }) =>
      postApiData("/signup", userData),
    onError: () => {
      toast.error("Sign Up failed. Please try again.");
    },
    onSuccess: () => {
      toast.success("Sign Up successful! Please log in.");
      onSuccessHandler();
      navigate("/login");
    },
  });

  return { mutate };
};
