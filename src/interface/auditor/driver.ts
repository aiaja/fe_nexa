export type RiskLevel =
| "CRITICAL"
| "HIGH"
| "MEDIUM"
| "LOW"

export type ResolutionType =
| "confirmed_theft"
| "driver_behavior"
| "vehicle_problem"
| "no_violation"

export type IncidentCategory =
| "SUDDEN DROP"
| "OUT OF ZONE"
| "OVERCONSUMPTION"


export interface DriverAnalytics {
  id: string;
  driverId: string;
  name: string;
  incidents: number;
  riskScore: number;
  riskLevel: RiskLevel;
}
export interface DriverDetail {
  id: string;
  driverId: string;
  name: string;
  riskScore: number;
  joinDate: string;
  performanceMetrics: {
    onTimeDelivery: number;
    fuelEfficiency: number;
    safetyScore: number;
    complianceRate: number;
  };
  incidentHistory: Array<{
    id: string;
    date: string;
    type: IncidentCategory;
    severity: string;
    description: string;
    resolution: ResolutionType;
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
