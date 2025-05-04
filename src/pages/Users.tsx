
import Layout from "@/components/Layout";
import { User } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Users = () => {
  const [users] = useState<User[]>([
    {
      id: "1",
      username: "agent",
      password: "********",
      role: "agent",
      name: "Agent Demo"
    },
    {
      id: "2",
      username: "supervisor",
      password: "********",
      role: "supervisor",
      name: "Superviseur Demo"
    },
    {
      id: "3",
      username: "director",
      password: "********",
      role: "director",
      name: "Directeur Demo"
    }
  ]);

  const roleLabels: Record<string, string> = {
    agent: "Agent",
    supervisor: "Superviseur",
    director: "Directeur"
  };

  const roleColors: Record<string, string> = {
    agent: "bg-green-100 text-green-800",
    supervisor: "bg-blue-100 text-blue-800",
    director: "bg-purple-100 text-purple-800"
  };

  return (
    <Layout requiredRole="director">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <Button className="flex items-center gap-2" disabled>
          Ajouter un Utilisateur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
          <CardDescription>
            Consultez et gérez les rôles des utilisateurs enregistrés.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
            <AlertDescription>
              Note de Sécurité :
              <br />
              La modification des rôles directement depuis cette interface est à des fins de démonstration. 
              Dans une application réelle, cette opération DOIT être sécurisée via une fonction backend (Cloud Function) 
              pour vérifier les permissions du directeur avant d'appliquer le changement.
            </AlertDescription>
          </Alert>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Nom
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Identifiant
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Rôle
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4 text-sm">{user.name}</td>
                    <td className="px-4 py-4 text-sm">{user.username}</td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          roleColors[user.role]
                        }`}
                      >
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-center">
                      <Button variant="outline" size="sm" disabled>
                        Modifier
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Users;
