export type IncidentCategory ='SUDDEN DROP' | 'OUT OF ZONE' | 'OVERCONSUMPTION';
export type IncidentSaverity = 'CRICTICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export interface Driver{
 id: string;
 name: string;
}

export interface Fleet{
 id: string;
 model: string;
}

export interface IncidentReport {
  id: string;
  caseNumber: string;
  fleetId: string;
  driverId: string;
  zoneId: string
  title: string;
  location: string;
  category: IncidentCategory;
  severity: IncidentSaverity;
  detectionDate: string;
  driver: Driver;
  fleet: Fleet;
  keyIndicators: string[];
}

