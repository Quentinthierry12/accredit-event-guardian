
import { useState } from "react";
import Layout from "@/components/Layout";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Accreditation, Location, UserRole, Visitor } from "@/types";
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
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";

const Accreditations = () => {
  const { accreditations, visitors, locations, addAccreditation } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [accessLevel, setAccessLevel] = useState<UserRole>("agent");
  const [validFrom, setValidFrom] = useState(format(new Date(), "yyyy-MM-dd"));
  const [validUntil, setValidUntil] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd"));
  const [loading, setLoading] = useState(true);

  // Simulate loading state for demonstration
  setTimeout(() => setLoading(false), 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add accreditation
    addAccreditation({
      visitorId,
      locationId,
      accessLevel,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil)
    });

    // Reset form and close dialog
    setVisitorId("");
    setLocationId("");
    setAccessLevel("agent");
    setIsLoading(false);
    setIsDialogOpen(false);
  };

  const accessLevelLabels: Record<UserRole, string> = {
    agent: "Agent",
    supervisor: "Superviseur",
    director: "Directeur"
  };

  const accessLevelColors: Record<UserRole, string> = {
    agent: "bg-green-100 text-green-800",
    supervisor: "bg-blue-100 text-blue-800",
    director: "bg-purple-100 text-purple-800"
  };

  const hasData = visitors.length > 0 && locations.length > 0;

  return (
    <Layout requiredRole="supervisor">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gestion des Accréditations</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2"
          disabled={!hasData}
        >
          <Plus className="h-4 w-4" />
          Ajouter une Accréditation
        </Button>
      </div>

      {!hasData && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
          Veuillez d'abord ajouter des visiteurs actifs et des lieux.
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium">Accréditations Actives et Passées</h2>
          <p className="text-sm text-muted-foreground">
            Consultez et gérez les accès accordés aux visiteurs pour les différents lieux.
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-muted" />
            </div>
          ) : accreditations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune accréditation enregistrée.</p>
              {hasData && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Ajouter une accréditation
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Visiteur
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Lieu
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Niveau d'accès
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Validité
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {accreditations.map((accreditation: Accreditation) => {
                    const visitor = visitors.find(v => v.id === accreditation.visitorId);
                    const location = locations.find(l => l.id === accreditation.locationId);
                    const now = new Date();
                    const isActive = 
                      accreditation.isActive && 
                      new Date(accreditation.validFrom) <= now && 
                      new Date(accreditation.validUntil) >= now;
                    
                    return (
                      <tr key={accreditation.id} className="hover:bg-muted/30">
                        <td className="px-4 py-4 text-sm">{visitor?.name || "Inconnu"}</td>
                        <td className="px-4 py-4 text-sm">{location?.name || "Inconnu"}</td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${accessLevelColors[accreditation.accessLevel]}`}>
                            {accessLevelLabels[accreditation.accessLevel]}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          Du {format(new Date(accreditation.validFrom), "dd MMM yyyy", { locale: fr })} au{" "}
                          {format(new Date(accreditation.validUntil), "dd MMM yyyy", { locale: fr })}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {isActive ? (
                            <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                              Actif
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">
                              Expiré
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une Accréditation</DialogTitle>
            <DialogDescription>
              Attribuez des droits d'accès à un visiteur pour un lieu spécifique.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="visitor">Visiteur</Label>
                <Select
                  value={visitorId}
                  onValueChange={(value) => setVisitorId(value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un visiteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {visitors.map((visitor: Visitor) => (
                      <SelectItem key={visitor.id} value={visitor.id}>
                        {visitor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Lieu</Label>
                <Select
                  value={locationId}
                  onValueChange={(value) => setLocationId(value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location: Location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Niveau d'accès</Label>
                <Select
                  value={accessLevel}
                  onValueChange={(value) => setAccessLevel(value as UserRole)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau d'accès" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="supervisor">Superviseur</SelectItem>
                    <SelectItem value="director">Directeur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valide du</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">jusqu'au</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    required
                  />
                </div>
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
                  "Ajouter l'Accréditation"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Accreditations;
