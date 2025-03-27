import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getUserProfile, login, logout } from "@/service/authService";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const profile = await getUserProfile();
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
        }
      } catch (error) {
        console.warn("User not authenticated", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const loginUser = useCallback(async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response && response.user) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, []);

  const logoutUser = useCallback(() => {
    logout();
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
