
import { useState } from "react";
import Layout from "@/components/Layout";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ShieldAlert, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccessControl = () => {
  const { locations, verifyAccess, getVisitorById } = useData();
  const [visitorId, setVisitorId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [result, setResult] = useState<{
    granted: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Small delay to simulate processing
    setTimeout(() => {
      const accessResult = verifyAccess(visitorId, locationId);
      setResult(accessResult);
      setLoading(false);
    }, 800);
  };

  const visitor = visitorId ? getVisitorById(visitorId) : null;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Contrôle d'Accès</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vérifier un ID Visiteur</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visitorId">ID Visiteur</Label>
                <Input
                  id="visitorId"
                  placeholder="Scannez ou entrez l'ID (Ex: VIS-XXXXXXXX-XXXX)"
                  value={visitorId}
                  onChange={(e) => {
                    setVisitorId(e.target.value);
                    setResult(null);
                  }}
                  required
                  className="font-mono"
                />
                {visitor && (
                  <div className="text-sm mt-2 p-2 bg-green-50 rounded text-green-700">
                    Visiteur identifié: {visitor.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lieu à accéder</Label>
                <Select
                  value={locationId}
                  onValueChange={(value) => {
                    setLocationId(value);
                    setResult(null);
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !visitorId || !locationId}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Vérifier l'Accès
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card className={result.granted ? "border-green-500" : "border-red-500"}>
            <CardHeader className={result.granted ? "bg-green-50" : "bg-red-50"}>
              <CardTitle className="text-lg flex items-center">
                {result.granted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700">Accès Autorisé</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700">Accès Refusé</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center">
                {result.granted ? (
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="h-16 w-16 text-green-500 mb-4" />
                    <p className="text-lg font-medium text-green-700">{result.message}</p>
                    <p className="mt-2 text-sm text-green-600">
                      Le contrôle d'accès a été enregistré dans les logs.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
                    <p className="text-lg font-medium text-red-700">{result.message}</p>
                    <p className="mt-2 text-sm text-red-600">
                      Cette tentative d'accès a été enregistrée dans les logs.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AccessControl;
