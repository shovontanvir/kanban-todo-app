import React, { useState } from "react";
import type { AuthProviderPropsType, AuthProviderType } from "../types/authProvider";

export const AuthContext = React.createContext<AuthProviderType | null>(null);

export const AuthProvider: React.FC<AuthProviderPropsType> = ({
  children
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    const handleLogin = (userId: string) => {
      setIsAuthenticated(true);
      setUserId(userId);
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setUserId(null);
    };

  return (
    <AuthContext
      value={{ isAuthenticated, userId, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext>
  );
};
