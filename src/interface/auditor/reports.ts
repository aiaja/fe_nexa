export type ResolutionType =
| "confirmed_theft"
| "driver_behavior"
| "fleet_issue"
| "no_violation";

export type IncidentCategory =
| "SUDDEN DROP"
| "OUT OF ZONE"
| "OVERCONSUMPTION"

export type IncidentSaverity =
| "CRITICAL"
| "HIGH"
| "MEDIUM"
| "LOW"

export type IncidentStatus =
| "RESOLVED"
| "UNRESOLVED"

export interface ReportCase {
  id: string;
  caseNumber: string;
  dateTime: string;
  fleetId: string;
  model: string;
  driverId: string;
  name: string;
  category: IncidentCategory;
  severity: IncidentSaverity;
  status: IncidentStatus
  resolution: ResolutionType;
  notes: string;
}

