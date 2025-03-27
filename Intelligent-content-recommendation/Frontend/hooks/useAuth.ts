import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user"); // Consider sessionStorage for security
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("user");
  }, []);

  return { user, loading, login, logout };
}

