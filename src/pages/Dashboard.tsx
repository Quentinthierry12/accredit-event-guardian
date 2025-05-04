
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Users, Key, ShieldCheck, ClipboardList, UserCog } from "lucide-react";

const Dashboard = () => {
  const { user, hasPermission } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-2">Bienvenue, {user?.name || "Utilisateur"}!</h1>
            <p className="text-muted-foreground">
              Votre rôle est : {user?.role === "director" ? "Directeur" : user?.role === "supervisor" ? "Superviseur" : "Agent"}. 
              Voici un aperçu rapide et des actions disponibles.
            </p>
            <p className="text-muted-foreground mt-4">
              Utilisez la barre latérale pour naviguer entre les différentes sections.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hasPermission("supervisor") && (
            <ActionCard
              title="Gérer les Lieux"
              icon={<MapPin className="h-5 w-5" />}
              link="/locations"
            />
          )}

          {hasPermission("supervisor") && (
            <ActionCard
              title="Gérer les Visiteurs"
              icon={<Users className="h-5 w-5" />}
              link="/visitors"
            />
          )}

          {hasPermission("supervisor") && (
            <ActionCard
              title="Gérer les Accréditations"
              icon={<Key className="h-5 w-5" />}
              link="/accreditations"
            />
          )}

          <ActionCard
            title="Effectuer un Contrôle"
            icon={<ShieldCheck className="h-5 w-5" />}
            link="/access-control"
          />

          {hasPermission("director") && (
            <ActionCard
              title="Consulter les Logs"
              icon={<ClipboardList className="h-5 w-5" />}
              link="/logs"
            />
          )}

          {hasPermission("director") && (
            <ActionCard
              title="Gérer les Utilisateurs"
              icon={<UserCog className="h-5 w-5" />}
              link="/users"
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const ActionCard = ({ title, icon, link }: ActionCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link to={link}>
          <Button className="w-full flex items-center gap-2">
            {icon}
            <span>Accéder</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
