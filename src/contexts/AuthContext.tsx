import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  linkedinId: string;
  followerCount: number;
  connectionCount: number;
  subscriptionTier: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mock authentication check
    const mockUser: User = {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      linkedinId: 'sarah-johnson-marketer',
      followerCount: 12500,
      connectionCount: 2847,
      subscriptionTier: 'pro'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: 'Sarah Johnson',
      email: email,
      avatar: 'https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      linkedinId: 'sarah-johnson-marketer',
      followerCount: 12500,
      connectionCount: 2847,
      subscriptionTier: 'pro'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};