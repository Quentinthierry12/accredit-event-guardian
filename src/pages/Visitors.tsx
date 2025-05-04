
import { useState } from "react";
import Layout from "@/components/Layout";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Visitor, VisitorStatus } from "@/types";
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

const Visitors = () => {
  const { visitors, addVisitor } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<VisitorStatus>("invite");
  const [loading, setLoading] = useState(true);

  // Simulate loading state for demonstration
  setTimeout(() => setLoading(false), 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add visitor
    addVisitor({
      name,
      status
    });

    // Reset form and close dialog
    setName("");
    setStatus("invite");
    setIsLoading(false);
    setIsDialogOpen(false);
  };

  const statusLabels: Record<VisitorStatus, string> = {
    vip: "VIP",
    presse: "Presse",
    prestataire: "Prestataire",
    invite: "Invité",
    staff: "Staff",
    en_attente: "En attente"
  };

  const statusColors: Record<VisitorStatus, string> = {
    vip: "bg-purple-100 text-purple-800",
    presse: "bg-blue-100 text-blue-800",
    prestataire: "bg-amber-100 text-amber-800",
    invite: "bg-green-100 text-green-800",
    staff: "bg-gray-100 text-gray-800",
    en_attente: "bg-red-100 text-red-800"
  };

  return (
    <Layout requiredRole="supervisor">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des Visiteurs</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un Visiteur
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Liste des Visiteurs</h2>
          <p className="text-sm text-muted-foreground">
            Consultez et gérez les visiteurs enregistrés.
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-muted" />
            </div>
          ) : visitors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun visiteur enregistré.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Ajouter un visiteur
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
                      Statut
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      ID Badge
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Date de création
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {visitors.map((visitor: Visitor) => (
                    <tr key={visitor.id} className="hover:bg-muted/30">
                      <td className="px-4 py-4 text-sm">{visitor.name}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${statusColors[visitor.status]}`}>
                          {statusLabels[visitor.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-mono">
                        {visitor.badgeId}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {format(new Date(visitor.createdAt), "dd MMM yyyy", { locale: fr })}
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
            <DialogTitle>Ajouter un Nouveau Visiteur</DialogTitle>
            <DialogDescription>
              Entrez les informations pour le nouveau visiteur.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom Complet</Label>
                <Input
                  id="name"
                  placeholder="Ex : Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as VisitorStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="presse">Presse</SelectItem>
                    <SelectItem value="prestataire">Prestataire</SelectItem>
                    <SelectItem value="invite">Invité</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="en_attente">En attente</SelectItem>
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
                  "Ajouter le Visiteur"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Visitors;
