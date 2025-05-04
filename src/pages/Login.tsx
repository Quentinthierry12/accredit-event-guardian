
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        toast.success("Connexion réussie");
      } else {
        toast.error("Identifiants incorrects");
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-sidebar rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-sidebar-accent" />
          </div>
          <h1 className="text-2xl font-bold">AccessKey</h1>
          <p className="text-gray-500">Système de gestion d'accréditations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Identifiant</Label>
            <Input
              id="username"
              type="text"
              placeholder="Entrez votre identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-sidebar hover:bg-sidebar/90"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800 mb-2 font-medium">Comptes de démonstration:</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>Agent: username: <strong>agent</strong>, password: <strong>agent123</strong></li>
            <li>Superviseur: username: <strong>supervisor</strong>, password: <strong>supervisor123</strong></li>
            <li>Directeur: username: <strong>director</strong>, password: <strong>director123</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
