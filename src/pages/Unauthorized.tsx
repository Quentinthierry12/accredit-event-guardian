
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <Layout requireAuth={true} requiredRole="agent">
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Accès Refusé</h1>
        <p className="text-lg text-gray-700 mb-6">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/dashboard">Retour au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
