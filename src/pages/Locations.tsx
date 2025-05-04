
import { useState } from "react";
import Layout from "@/components/Layout";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Location, UserRole } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Locations = () => {
  const { locations, addLocation } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [securityLevel, setSecurityLevel] = useState<UserRole>("agent");
  const [loading, setLoading] = useState(true);

  // Simulate loading state for demonstration
  setTimeout(() => setLoading(false), 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add location
    addLocation({
      name,
      description,
      securityLevel
    });

    // Reset form and close dialog
    setName("");
    setDescription("");
    setSecurityLevel("agent");
    setIsLoading(false);
    setIsDialogOpen(false);
  };

  const securityLevelLabels: Record<UserRole, string> = {
    agent: "Agent",
    supervisor: "Superviseur",
    director: "Directeur"
  };

  const securityLevelColors: Record<UserRole, string> = {
    agent: "bg-green-100 text-green-800",
    supervisor: "bg-blue-100 text-blue-800",
    director: "bg-purple-100 text-purple-800"
  };

  return (
    <Layout requiredRole="supervisor">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des Lieux</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un Lieu
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Liste des Lieux</h2>
          <p className="text-sm text-muted-foreground">
            Consultez et gérez les lieux enregistrés.
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-muted" />
            </div>
          ) : locations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun lieu enregistré.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Ajouter un lieu
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Niveau de sécurité
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Date de création
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {locations.map((location: Location) => (
                    <tr key={location.id} className="hover:bg-muted/30">
                      <td className="px-4 py-4 text-sm">{location.name}</td>
                      <td className="px-4 py-4 text-sm">
                        {location.description || "-"}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${securityLevelColors[location.securityLevel]}`}>
                          {securityLevelLabels[location.securityLevel]}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {format(new Date(location.createdAt), "dd MMM yyyy", { locale: fr })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un Nouveau Lieu</DialogTitle>
            <DialogDescription>
              Entrez les informations pour le nouveau lieu.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du Lieu</Label>
                <Input
                  id="name"
                  placeholder="Ex : Entrée Principale"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description du lieu..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityLevel">Niveau de Sécurité Requis</Label>
                <Select
                  value={securityLevel}
                  onValueChange={(value) => setSecurityLevel(value as UserRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="supervisor">Superviseur</SelectItem>
                    <SelectItem value="director">Directeur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Ajouter le Lieu"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Locations;
