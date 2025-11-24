// src/interface/auditor/reports.ts
export type ResolutionType = 
  | 'confirmed_theft'
  | 'driver_behavior'
  | 'fleet_issue'
  | 'no_violation';

export type CategoryType = 'SUDDEN DROP' | 'OUT OF ZONE' | 'OVERCONSUMPTION' | 'SENSOR MALFUNCTION';
export type SeverityType = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface ReportCase {
  id: string;
  caseId: string;
  dateTime: string;
  fleetId: string;
  fleetName?: string;
  driverId: string;
  driverName: string;
  category: CategoryType;
  severity: SeverityType;
  status: 'RESOLVED' | 'UNRESOLVED';
  resolution: ResolutionType;
  notes: string;
}

export interface ReportsPageData {
  cases: ReportCase[];
  total: number;
}

export interface FilterOptions {
  category?: CategoryType[];
  severity?: SeverityType[];
  resolution?: ResolutionType[];
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}