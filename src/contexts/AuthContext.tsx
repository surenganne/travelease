import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user: User = { id: '1', username: email.split('@')[0], email, isAdmin: false };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const loginAsAdmin = async (email: string, password: string) => {
    // Simulate API call
    // In a real application, you would verify admin credentials here
    const user: User = { id: 'admin1', username: 'Admin', email, isAdmin: true };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulate API call
    const user: User = { id: '1', username, email, isAdmin: false };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsAdmin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};