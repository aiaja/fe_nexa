import { LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface RoleCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  restricted?: boolean;
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: NavSubItem[];
}

export interface RoleConfig {
  label: string;
  icon: LucideIcon;
  path: string;
}

export type UserRole = 
  | "admin" 
  | "executive" 
  | "auditor" 
  | "manager" 
  | "superadmin"
  | "guest";


export interface NavigationConfig {
  role: UserRole;
  items: NavItem[];
}