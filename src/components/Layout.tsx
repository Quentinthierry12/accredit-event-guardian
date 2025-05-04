
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  requiredRole?: "agent" | "supervisor" | "director";
}

const Layout = ({ children, requireAuth = true, requiredRole = "agent" }: LayoutProps) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAuth && !hasPermission(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isAuthenticated && <Sidebar />}
      
      <main className={`flex-1 ${isAuthenticated ? 'ml-64' : ''}`}>
        {isAuthenticated && (
          <div className="bg-white shadow px-8 py-4 flex justify-end">
            <UserMenu />
          </div>
        )}
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
