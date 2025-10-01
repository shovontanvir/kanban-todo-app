export interface AuthProviderType {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | "";
  userEmail: string | "";
  handleLogin: (id: string, name: string, email: string) => void;
  handleLogout: () => void;
}

export interface AuthProviderPropsType {
  children?: React.ReactNode;
}
