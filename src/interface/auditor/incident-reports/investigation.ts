export type IncidentSaverity = 'CRICTICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface IncidentInvestigationLog {
  id: string;
  incidentId: string;
  time: string;
  location: string;
  saverity:IncidentSaverity;
  details: string[];
}

export interface CaseSummary {
  caseId: string;
  type: string;
  fleet: string;
  driver: string;
  date: string;
  severity: IncidentSaverity;
}

export interface InvestigationData {
  summary: CaseSummary;
  timeline: IncidentInvestigationLog[];
}