export type IncidentCategory =
| "SUDDEN DROP"
| "OUT OF ZONE"
| "OVERCONSUMPTION"

export type IncidentSaverity =
| "CRITICAL"
| "HIGH"
| "MEDIUM"
export interface Driver{
 driverId: string;
 name: string;
}

export interface Fleet{
 fleetId: string;
 model: string;
}

export interface IncidentReport {
  id: string
  caseNumber: string
  zoneId: string
  title: string
  location: string
  category: IncidentCategory
  severity: IncidentSaverity
  confidence: string
  detectionDate: string;
  driver: Driver;
  fleet: Fleet;
  keyIndicators: string[];
}

