
import Layout from "@/components/Layout";
import { useData } from "@/context/DataContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogAction } from "@/types";

const Logs = () => {
  const { logs } = useData();
  const [loading, setLoading] = useState(true);

  // Simulate loading state for demonstration
  setTimeout(() => setLoading(false), 1000);

  const actionLabels: Record<LogAction, string> = {
    login: "Connexion",
    logout: "Déconnexion",
    create_location: "Création de lieu",
    update_location: "Modification de lieu",
    delete_location: "Suppression de lieu",
    create_visitor: "Création de visiteur",
    update_visitor: "Modification de visiteur",
    delete_visitor: "Suppression de visiteur",
    create_accreditation: "Création d'accréditation",
    update_accreditation: "Modification d'accréditation",
    delete_accreditation: "Suppression d'accréditation",
    access_granted: "Accès autorisé",
    access_denied: "Accès refusé"
  };

  const actionIcons: Record<LogAction, string> = {
    login: "🔓",
    logout: "🔒",
    create_location: "📍",
    update_location: "🔄📍",
    delete_location: "❌📍",
    create_visitor: "👤",
    update_visitor: "🔄👤",
    delete_visitor: "❌👤",
    create_accreditation: "🔑",
    update_accreditation: "🔄🔑",
    delete_accreditation: "❌🔑",
    access_granted: "✅",
    access_denied: "⛔"
  };

  const actionColors: Record<LogAction, string> = {
    login: "bg-green-50 text-green-700 border-green-200",
    logout: "bg-blue-50 text-blue-700 border-blue-200",
    create_location: "bg-purple-50 text-purple-700 border-purple-200",
    update_location: "bg-purple-50 text-purple-700 border-purple-200",
    delete_location: "bg-red-50 text-red-700 border-red-200",
    create_visitor: "bg-amber-50 text-amber-700 border-amber-200",
    update_visitor: "bg-amber-50 text-amber-700 border-amber-200",
    delete_visitor: "bg-red-50 text-red-700 border-red-200",
    create_accreditation: "bg-indigo-50 text-indigo-700 border-indigo-200",
    update_accreditation: "bg-indigo-50 text-indigo-700 border-indigo-200",
    delete_accreditation: "bg-red-50 text-red-700 border-red-200",
    access_granted: "bg-green-50 text-green-700 border-green-200",
    access_denied: "bg-red-50 text-red-700 border-red-200"
  };

  return (
    <Layout requiredRole="director">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Journaux d'Accès</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des Tentatives d'Accès</CardTitle>
          <CardDescription>
            Les {logs.length} dernières tentatives d'accès enregistrées.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-muted" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun log enregistré.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 border rounded-md ${
                    actionColors[log.action]
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{actionIcons[log.action]}</span>
                      <span className="font-medium">
                        {actionLabels[log.action]}
                      </span>
                    </div>
                    <span className="text-sm">
                      {format(new Date(log.timestamp), "dd MMM yyyy à HH:mm", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{log.details}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Logs;
