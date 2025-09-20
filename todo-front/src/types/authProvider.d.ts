export interface AuthProviderType  {
  isAuthenticated: Boolean;
  userId: String | null;
  handleLogin: (userId: string) => void;
  handleLogout: () => void;
}

export interface AuthProviderPropsType {
  children?: React.ReactNode;
}