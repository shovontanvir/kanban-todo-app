/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import type {
  AuthProviderPropsType,
  AuthProviderType,
} from "../types/authProvider";

export const AuthContext = React.createContext<AuthProviderType | null>(null);

export const AuthProvider: React.FC<AuthProviderPropsType> = ({ children }) => {
  const name = localStorage.getItem("userName");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(name || "");
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = (id: string, name: string) => {
    setIsAuthenticated(true);
    setUserId(id);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName("");
  };

  return (
    <AuthContext
      value={{ isAuthenticated, userId, userName, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext>
  );
};
