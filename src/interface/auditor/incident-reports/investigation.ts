export type IncidentSaverity =
| "CRITICAL"
| "HIGH"
| "MEDIUM"


export interface IncidentInvestigationLog {
  id: string
  incidentId: string
  time: string
  location: string
  saverity:IncidentSaverity;
  details: string[]
}

export interface CaseSummary {
  id: string
  caseNumber: string
  type: string
  fleetId: string
  driverId: string
  date: string
  severity: IncidentSaverity
}

export interface InvestigationData {
  summary: CaseSummary
  timeline: IncidentInvestigationLog[]
}