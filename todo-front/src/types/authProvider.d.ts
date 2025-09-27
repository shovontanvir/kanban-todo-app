export interface AuthProviderType {
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | "";
  handleLogin: (id: string, name: string) => void;
  handleLogout: () => void;
}

export interface AuthProviderPropsType {
  children?: React.ReactNode;
}
