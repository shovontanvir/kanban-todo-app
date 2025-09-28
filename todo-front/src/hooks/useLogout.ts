import { postApiData } from "@/apiServices/apiServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => postApiData("/logout", {}),
    onSuccess: () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userName");
      navigate("/login");
    },
    onError: (err) => {
      console.log("there was an error while logging out", err);
    },
  });

  return { mutate };
};
