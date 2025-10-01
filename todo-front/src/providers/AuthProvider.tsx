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
  const [userEmail, setUserEmail] = useState<string>("");

  const handleLogin = (id: string, name: string, email: string) => {
    setIsAuthenticated(true);
    setUserId(id);
    setUserName(name);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserName("");
    setUserEmail("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext
      value={{
        isAuthenticated,
        userId,
        userName,
        userEmail,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext>
  );
};
