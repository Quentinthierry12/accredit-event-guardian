
import { createContext, useState, useContext, ReactNode } from "react";
import { Location, Visitor, Accreditation, Log, LogAction, User } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface DataContextType {
  locations: Location[];
  visitors: Visitor[];
  accreditations: Accreditation[];
  logs: Log[];
  addLocation: (location: Omit<Location, "id" | "createdAt" | "createdBy">) => void;
  addVisitor: (visitor: Omit<Visitor, "id" | "badgeId" | "createdAt" | "createdBy">) => void;
  addAccreditation: (accreditation: Omit<Accreditation, "id" | "createdAt" | "createdBy" | "isActive">) => void;
  verifyAccess: (visitorId: string, locationId: string) => { granted: boolean; message: string };
  getLocationById: (id: string) => Location | undefined;
  getVisitorById: (id: string) => Visitor | undefined;
  getAccreditationsByVisitor: (visitorId: string) => Accreditation[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data
const INITIAL_LOCATIONS: Location[] = [
  {
    id: "loc-1",
    name: "Entrée Principale",
    description: "Zone d'accueil générale",
    securityLevel: "agent",
    createdAt: new Date('2024-01-15'),
    createdBy: "3"
  },
  {
    id: "loc-2",
    name: "Salle de Conférence",
    description: "Zone des présentations",
    securityLevel: "supervisor",
    createdAt: new Date('2024-02-20'),
    createdBy: "3"
  },
  {
    id: "loc-3",
    name: "Zone VIP",
    description: "Réservé aux personnalités",
    securityLevel: "director",
    createdAt: new Date('2024-03-05'),
    createdBy: "3"
  }
];

const INITIAL_VISITORS: Visitor[] = [
  {
    id: "vis-1",
    name: "Jean Dupont",
    status: "vip",
    badgeId: "VIS-12345678",
    createdAt: new Date('2024-04-10'),
    createdBy: "2"
  },
  {
    id: "vis-2",
    name: "Marie Martin",
    status: "presse",
    badgeId: "VIS-87654321",
    createdAt: new Date('2024-04-12'),
    createdBy: "3"
  }
];

const INITIAL_ACCREDITATIONS: Accreditation[] = [
  {
    id: "acc-1",
    visitorId: "vis-1",
    locationId: "loc-1",
    accessLevel: "agent",
    validFrom: new Date('2024-05-01'),
    validUntil: new Date('2024-05-03'),
    isActive: true,
    createdAt: new Date('2024-04-15'),
    createdBy: "3"
  },
  {
    id: "acc-2",
    visitorId: "vis-1",
    locationId: "loc-3",
    accessLevel: "director",
    validFrom: new Date('2024-05-01'),
    validUntil: new Date('2024-05-03'),
    isActive: true,
    createdAt: new Date('2024-04-15'),
    createdBy: "3"
  }
];

const INITIAL_LOGS: Log[] = [
  {
    id: "log-1",
    userId: "3",
    action: "create_location",
    details: "Création du lieu: Entrée Principale",
    timestamp: new Date('2024-01-15'),
    relatedId: "loc-1"
  },
  {
    id: "log-2",
    userId: "3",
    action: "create_visitor",
    details: "Création du visiteur: Jean Dupont",
    timestamp: new Date('2024-04-10'),
    relatedId: "vis-1"
  }
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [locations, setLocations] = useState<Location[]>(INITIAL_LOCATIONS);
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [accreditations, setAccreditations] = useState<Accreditation[]>(INITIAL_ACCREDITATIONS);
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);

  const addLog = (action: LogAction, details: string, relatedId?: string) => {
    if (!user) return;
    
    const newLog: Log = {
      id: `log-${uuidv4()}`,
      userId: user.id,
      action,
      details,
      timestamp: new Date(),
      relatedId
    };
    
    setLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const addLocation = (locationData: Omit<Location, "id" | "createdAt" | "createdBy">) => {
    if (!user) return;
    
    const newLocation: Location = {
      id: `loc-${uuidv4()}`,
      ...locationData,
      createdAt: new Date(),
      createdBy: user.id
    };
    
    setLocations(prevLocations => [...prevLocations, newLocation]);
    addLog("create_location", `Création du lieu: ${newLocation.name}`, newLocation.id);
    toast.success(`Lieu "${newLocation.name}" créé avec succès`);
  };

  const addVisitor = (visitorData: Omit<Visitor, "id" | "badgeId" | "createdAt" | "createdBy">) => {
    if (!user) return;
    
    const badgeId = `VIS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const newVisitor: Visitor = {
      id: `vis-${uuidv4()}`,
      ...visitorData,
      badgeId,
      createdAt: new Date(),
      createdBy: user.id
    };
    
    setVisitors(prevVisitors => [...prevVisitors, newVisitor]);
    addLog("create_visitor", `Création du visiteur: ${newVisitor.name}`, newVisitor.id);
    toast.success(`Visiteur "${newVisitor.name}" créé avec succès`);
  };

  const addAccreditation = (accreditationData: Omit<Accreditation, "id" | "createdAt" | "createdBy" | "isActive">) => {
    if (!user) return;
    
    const newAccreditation: Accreditation = {
      id: `acc-${uuidv4()}`,
      ...accreditationData,
      isActive: true,
      createdAt: new Date(),
      createdBy: user.id
    };
    
    setAccreditations(prevAccreditations => [...prevAccreditations, newAccreditation]);
    
    const visitor = visitors.find(v => v.id === accreditationData.visitorId);
    const location = locations.find(l => l.id === accreditationData.locationId);
    
    if (visitor && location) {
      addLog(
        "create_accreditation", 
        `Accréditation créée: ${visitor.name} pour ${location.name}`, 
        newAccreditation.id
      );
      toast.success(`Accréditation créée avec succès pour ${visitor.name}`);
    }
  };

  const verifyAccess = (visitorId: string, locationId: string) => {
    const now = new Date();
    const visitor = visitors.find(v => v.id === visitorId || v.badgeId === visitorId);
    const location = locations.find(l => l.id === locationId);
    
    if (!visitor) {
      addLog("access_denied", `Accès refusé: Visiteur inconnu (ID: ${visitorId})`);
      return { granted: false, message: "Visiteur inconnu" };
    }
    
    if (!location) {
      addLog("access_denied", `Accès refusé: Lieu inconnu (ID: ${locationId})`, visitor.id);
      return { granted: false, message: "Lieu inconnu" };
    }
    
    const validAccreditation = accreditations.find(a => 
      a.visitorId === visitor.id && 
      a.locationId === location.id && 
      a.isActive &&
      a.validFrom <= now &&
      a.validUntil >= now
    );
    
    if (!validAccreditation) {
      addLog(
        "access_denied", 
        `Accès refusé: ${visitor.name} à ${location.name} - Pas d'accréditation valide`, 
        visitor.id
      );
      return { granted: false, message: "Pas d'accréditation valide pour ce lieu" };
    }
    
    addLog(
      "access_granted", 
      `Accès autorisé: ${visitor.name} à ${location.name}`, 
      visitor.id
    );
    return { granted: true, message: `Accès autorisé pour ${visitor.name}` };
  };

  const getLocationById = (id: string) => {
    return locations.find(location => location.id === id);
  };

  const getVisitorById = (id: string) => {
    return visitors.find(visitor => visitor.id === id || visitor.badgeId === id);
  };

  const getAccreditationsByVisitor = (visitorId: string) => {
    return accreditations.filter(accreditation => accreditation.visitorId === visitorId);
  };

  return (
    <DataContext.Provider
      value={{
        locations,
        visitors,
        accreditations,
        logs,
        addLocation,
        addVisitor,
        addAccreditation,
        verifyAccess,
        getLocationById,
        getVisitorById,
        getAccreditationsByVisitor
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
