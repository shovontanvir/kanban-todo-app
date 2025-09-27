import { use } from "react";
import { AuthContext } from "../providers/AuthProvider";
import type { AuthProviderType } from "../types/authProvider";

export const useAuth = (): AuthProviderType => {
  const authContext = use(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
