import { Truck, Gauge, Fuel, AlertTriangle, User2Icon } from "lucide-react";
import type {
  DashboardOverview,
  AnomalyDetection,
  FleetTotal,
  RecentIncidents,
} from "@/interface/auditor/dashboard";

export const dashboardItem: DashboardOverview[] = [
  {
    title: "Anomaly Detection",
    desc: "Real-Time monitoring for fuel theft patterns and suspicious activities",
    value: 87,
    icon: "AlertTriangle",
    color: "text-[#ea2727ff]",
    linkText: 'View Detail'
  },
  {
    title: "Fleet Condition",
    desc: "Monitor vehicle health, sensor status, and maintenance alerts",
    value: 87,
    icon: "Truck",
    color: "text-[#3b82f6]",
    linkText: 'View Detail'
  },
  {
    title: "Behavior Driver",
    desc: "Track driver patterns, route deviations, and behavior anomalies",
    value: 27,
    icon: "User2Icon",
    color: "text-[#e46916ff]",
    linkText: 'View Detail'
  },
];

export const anomalyItem: AnomalyDetection[] = [
  {
    name: "Sudden Drop Detection",
    value: 2,
    color: "#ea2727",
  },
  {
    name: "Out of Zone Alert",
    value: 15,
    color: "#f59e0b",
  },
  {
    name: "Overconsumption Warning",
    value: 2,
    color: "#3b82f6",
  },
];

export const fleetItem: FleetTotal[] = [
  {
    name: "Normal",
    value: 45,
    percent: Math.round((45 / 95) * 100),
    color: "#10b981",
  },
  {
    name: "Under Watch",
    value: 8,
    percent: Math.round((8 / 95) * 100),
    color: "#f59e0b",
  },
  {
    name: "Monitoring",
    value: 14,
    percent: Math.round((14 / 95) * 100),
    color: "#3b82f6",
  },
  {
    name: "Maintenance",
    value: 28,
    percent: Math.round((28 / 95) * 100),
    color: "#6366f1",
  },
];

export const incidentItem: RecentIncidents[] = [
  {
    id: "INC-087",
    truck: "TRK-003",
    datetime: "2024-11-01 14:30",
    type: "Sudden Drop",
    loss: "45L",
    status: "Critical",
  },
  {
    id: "INC-088",
    truck: "TRK-004",
    datetime: "2024-11-01 14:30",
    type: "Anomalous Pattern",
    loss: "28L",
    status: "High",
  },
  {
    id: "INC-089",
    truck: "TRK-005",
    datetime: "2024-11-01 14:30",
    type: "Off-hours Tapping",
    loss: "32L",
    status: "High",
  },
  {
    id: "INC-090",
    truck: "TRK-006",
    datetime: "2024-11-01 14:30",
    type: "Anomaly Detection",
    loss: "15L",
    status: "Medium",
  },
  {
    id: "INC-091",
    truck: "TRK-007",
    datetime: "2024-11-01 14:30",
    type: "Sudden Drop",
    loss: "36L",
    status: "High",
  },
  {
    id: "INC-092",
    truck: "TRK-008",
    datetime: "2024-11-01 14:30",
    type: "Anomaly Detection",
    loss: "53L",
    status: "Critical",
  },
];