export interface RouteTimelineEvent { //IncidentInvestigationLog 
  id: string;
  //tambah incidentId
  time: string;
  location: string; //dapet dari incident
  type: 'depot' | 'checkpoint' | 'anomaly'; //takeout
  status: 'normal' | 'warning' | 'critical'; //ganti severity dapet dr incident 
  tankLevel: number; //takeout
  tankCapacity: number; //takeout
  details: string[];
}

export interface CaseSummary {
  caseId: string;
  type: string;
  fleet: string;
  driver: string;
  date: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface InvestigationData {
  summary: CaseSummary;
  timeline: RouteTimelineEvent[];
}