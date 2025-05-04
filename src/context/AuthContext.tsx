
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "agent",
    password: "agent123",
    role: "agent",
    name: "Agent Demo"
  },
  {
    id: "2",
    username: "supervisor",
    password: "supervisor123",
    role: "supervisor",
    name: "Superviseur Demo"
  },
  {
    id: "3",
    username: "director",
    password: "director123",
    role: "director",
    name: "Directeur Demo"
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage when the app loads
    const savedUser = localStorage.getItem("accesskey_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = {
        ...foundUser,
        password: undefined
      };
      setUser(userWithoutPassword as User);
      localStorage.setItem("accesskey_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accesskey_user");
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;

    const roleHierarchy: { [key in UserRole]: number } = {
      agent: 1,
      supervisor: 2,
      director: 3
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
