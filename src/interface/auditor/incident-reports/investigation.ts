export interface RouteTimelineEvent {
  id: string;
  time: string;
  location: string;
  type: 'depot' | 'checkpoint' | 'anomaly';
  status: 'normal' | 'warning' | 'critical';
  tankLevel: number;
  tankCapacity: number;
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