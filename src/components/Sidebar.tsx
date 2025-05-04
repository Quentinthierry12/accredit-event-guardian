
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  Key,
  ShieldCheck,
  ClipboardList,
  UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { hasPermission } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen w-64 bg-sidebar flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-2 text-sidebar-foreground border-b border-[#2D3748]">
        <ShieldCheck className="h-6 w-6 text-sidebar-accent" />
        <h1 className="text-xl font-semibold">AccessKey</h1>
      </div>

      <div className="flex-1 py-8 flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          icon={<Home className="h-5 w-5" />}
          label="Tableau de bord"
          active={isActive("/dashboard")}
        />
        
        <NavLink
          to="/locations"
          icon={<MapPin className="h-5 w-5" />}
          label="Lieux"
          active={isActive("/locations")}
          disabled={!hasPermission("supervisor")}
        />
        
        <NavLink
          to="/visitors"
          icon={<Users className="h-5 w-5" />}
          label="Visiteurs"
          active={isActive("/visitors")}
          disabled={!hasPermission("supervisor")}
        />
        
        <NavLink
          to="/accreditations"
          icon={<Key className="h-5 w-5" />}
          label="Accréditations"
          active={isActive("/accreditations")}
          disabled={!hasPermission("supervisor")}
        />
        
        <NavLink
          to="/access-control"
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Contrôle d'accès"
          active={isActive("/access-control")}
        />
        
        <NavLink
          to="/logs"
          icon={<ClipboardList className="h-5 w-5" />}
          label="Logs"
          active={isActive("/logs")}
          disabled={!hasPermission("director")}
        />
        
        <NavLink
          to="/users"
          icon={<UserCog className="h-5 w-5" />}
          label="Gestion Utilisateurs"
          active={isActive("/users")}
          disabled={!hasPermission("director")}
        />
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  disabled?: boolean;
}

const NavLink = ({ to, icon, label, active, disabled = false }: NavLinkProps) => {
  if (disabled) {
    return (
      <div className="px-6 py-3 flex items-center gap-3 text-gray-500 cursor-not-allowed opacity-50">
        {icon}
        <span>{label}</span>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "px-6 py-3 flex items-center gap-3 text-sidebar-foreground transition-colors",
        active
          ? "bg-sidebar-accent/20 text-sidebar-accent border-l-4 border-sidebar-accent"
          : "hover:bg-sidebar-accent/10"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
