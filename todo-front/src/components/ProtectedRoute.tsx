import { useEffect } from "react";
import { useNavigate } from "react-router";

import { type ReactNode } from "react";
import Layout from "@/components/Layout";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
