import { LucideIcon } from "lucide-react";

// Summary Cards
export interface DashboardOverview {
  title: string;
  desc: string;
  value: number;
  icon: string;
  color: string;
  linkText: string;
}

// Anomaly Bar Chart
export interface AnomalyDetection {
  name: string;
  value: number;
  color: string;
}

// Fleet Totals Pie Chart
export interface FleetTotal {
  name: string;
  value: number;
  color: string;
  percent: number;
}

// Incident Table
export interface RecentIncidents {
  id: string;
  truck: string;
  datetime: string;
  type: string;
  loss: string;
  status: "Critical" | "High" | "Medium";
}


