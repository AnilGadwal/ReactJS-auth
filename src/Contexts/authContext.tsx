import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";


interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>('');
  
  const value = {
    token,
    setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
