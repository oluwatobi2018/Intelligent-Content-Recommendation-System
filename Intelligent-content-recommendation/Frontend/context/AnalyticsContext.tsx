import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserProfile, login, logout } from "@/service/authService";

interface AuthContextProps {
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("User not authenticated");
      }
    };
    fetchUser();
  }, []);

  const loginUser = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response) {
      setUser(response.user);
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
