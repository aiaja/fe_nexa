export type FleetStatus =
| "ACTIVE"
| "UNDER WATCH"
| "MONITORING"
| "INACTIVE"

export interface FleetAnalytics {
  id: string
  fleetId: string
  make: string
  model: string
  issues: number
  status: FleetStatus
}

export type IncidentSeverity = 
| "CRITICAL"
| "HIGH"
| "MEDIUM"
| "LOW"

export type IncidentStatus = 
| "Under Investigation"
| "Confirmed"
| "Resolved"
| "Dismissed"

export interface FleetDetail {
  id: string;
  fleetId: string;
  modelYear: string;
  model: string;
  status: FleetStatus;
  riskScore: number;
  currentDriver: {
    name: string;
    id: string;
  };
  routeHistory: RouteHistory[];
  refuelingHistory: RefuelingRecord[];
  incidents: Incident[];
}

export interface RouteHistory {
  id: string;
  from: string;
  to: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: string;
  fuelUsed: string;
  hasAnomaly: boolean;
  checkpoints: RouteCheckpoint[];
}

export interface RouteCheckpoint {
  id: string;
  name: string;
  type: "depot" | "checkpoint" | "anomaly";
  time: string;
  fuel: string;
  coordinates: string;
}

export interface RefuelingRecord {
  id: string;
  date: string;
  time: string;
  station: string;
  location: string;
  coordinates: string;
  liters: string;
  pricePerLiter: string;
  totalCost: string;
  receiptNumber: string;
  paymentMethod: string;
}

export interface Incident {
  id: string;
  incidentNumber: string;
  date: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  title: string;
  description: string;
  driver: {
    name: string;
    id: string;
  };
}

