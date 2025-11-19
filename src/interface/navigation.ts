import { LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
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
  | "guest";


export interface NavigationConfig {
  role: UserRole;
  items: NavItem[];
}