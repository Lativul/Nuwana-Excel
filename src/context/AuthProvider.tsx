import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginAsAdmin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    void password;
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      isPremium: false,
      role: 'User',
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    void password;
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: '1',
      name,
      email,
      isPremium: false,
      role: 'User',
    });
  };

  const loginAsAdmin = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: '999',
      name: 'Admin User',
      email: 'admin@nuwanaexcel.com',
      isPremium: true,
      role: 'Administrator',
    });
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Administrator',
        login,
        register,
        loginAsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
