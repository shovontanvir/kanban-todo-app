import { postApiData } from "@/apiServices/apiServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => postApiData("/logout", {}),
    onSuccess: () => {
      toast.success("Logged out successfully!");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userName");
      navigate("/login");
    },
    onError: () => {
      toast.error("there was an error while logging out");
    },
  });

  return { mutate };
};
