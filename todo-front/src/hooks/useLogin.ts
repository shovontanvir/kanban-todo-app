import { postApiData } from "../apiServices/apiServices";
import { useMutation } from "@tanstack/react-query";
import type { LoginFormInputs } from "../types/login";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (loginData: LoginFormInputs) =>
      postApiData("/login", loginData, {}),
    onError: () => {
      toast.error("Login failed. Please check your credentials and try again.");
    },
    onSuccess: (data) => {
      toast.success("Login successful!");
      localStorage.setItem("access_token", data?.data?.accessToken);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data?.data?.user?.name);
      handleLogin(data?.data?.user?._id, data?.data?.user?.name);
      navigate("/");
    },
  });

  return { mutate };
};
