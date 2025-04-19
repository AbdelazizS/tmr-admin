// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
// src/services/auth.ts
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
interface AuthContextType {
  user: { id: string; name: string } | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; name: string } | null>(
    localStorage.getItem("user") || null
    
  );



  const login = async (email: string, password: string) => {
    // Mock API call delay & fake auth
    try {
      const response = await api.post("/login", { email, password });

      if (response.data?.token) {
        // Secure storage of auth data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);

        // Return the complete response for component handling
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      // User-friendly error messages
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 429) {
        toast.error("Too many attempts. Please wait before trying again.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again later.");
      }

      // Still throw the error for component-level handling
      throw error;
    }
  };

  const logout = () => {
   // Clear client-side storage
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   delete api.defaults.headers.common['Authorization']
   
   // Reset state
   setUser(null)
   
   window.location.href = '/'
   
   // Optional: Call backend logout endpoint
   api.post('/logout').catch(() => {})
   
   toast.info('You have been logged out')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
};
