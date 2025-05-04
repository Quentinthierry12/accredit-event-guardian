
export type UserRole = "agent" | "supervisor" | "director";

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  securityLevel: UserRole;
  createdAt: Date;
  createdBy: string;
}

export type VisitorStatus = "vip" | "presse" | "prestataire" | "invite" | "staff" | "en_attente";

export interface Visitor {
  id: string;
  name: string;
  status: VisitorStatus;
  badgeId: string;
  createdAt: Date;
  createdBy: string;
}

export interface Accreditation {
  id: string;
  visitorId: string;
  locationId: string;
  accessLevel: UserRole;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
}

export type LogAction = 
  | "login" 
  | "logout" 
  | "create_location" 
  | "update_location" 
  | "delete_location" 
  | "create_visitor" 
  | "update_visitor" 
  | "delete_visitor" 
  | "create_accreditation" 
  | "update_accreditation" 
  | "delete_accreditation" 
  | "access_granted" 
  | "access_denied";

export interface Log {
  id: string;
  userId: string;
  action: LogAction;
  details: string;
  timestamp: Date;
  relatedId?: string;
}
