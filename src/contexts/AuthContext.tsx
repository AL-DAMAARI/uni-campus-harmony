import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'faculty' | 'student' | 'department_head';
  profile?: {
    phone?: string;
    address?: string;
    department?: string;
    studentId?: string;
    facultyId?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication - replace with actual auth logic later
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email for demo
    let mockUser: User;
    if (email.includes('admin')) {
      mockUser = { id: '1', email, name: 'John Admin', role: 'admin' };
    } else if (email.includes('faculty')) {
      mockUser = { id: '2', email, name: 'Dr. Sarah Johnson', role: 'faculty', profile: { department: 'Computer Science', facultyId: 'FAC001' } };
    } else if (email.includes('dept')) {
      mockUser = { id: '3', email, name: 'Prof. Michael Chen', role: 'department_head', profile: { department: 'Computer Science' } };
    } else {
      mockUser = { id: '4', email, name: 'Emily Student', role: 'student', profile: { department: 'Computer Science', studentId: 'STU2024001' } };
    }

    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('university_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Store user in localStorage
    if (user) {
      localStorage.setItem('university_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('university_user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};