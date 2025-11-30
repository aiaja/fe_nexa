export type RiskLevel =
| "CRITICAL"
| "HIGH"
| "MEDIUM"
| "LOW"

export interface DriverAnalytics {
  rank: number;
  driverId: string;
  name: string;
  incidents: number;
  riskScore: number;
  riskLevel: RiskLevel;
}

export interface DriverDetail {
  driverId: string;
  name: string;
  riskScore: number;
  joinDate: string;
  incidentHistory: Array<{
    id: string;
    date: string;
    type: string;
    severity: string;
    description: string;
    resolution: string;
  }>;
  recentTrips: Array<{
    date: string;
    fleetId: string;
    route: string;
    distance: string;
    fuelUsed: string;
    duration: string;
    status: string;
  }>;
}
