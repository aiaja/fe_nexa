export type IncidentPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type IncidentCategory ='SUDDEN DROP' | 'OUT OF ZONE' | 'OVERCONSUMPTION';

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
  title: string;
  vehicleName: string;
  priority: IncidentPriority;
  category: IncidentCategory;
  detectionDate: string;
  driver: Driver;
  fleet: Fleet;
  severity: {
    level: IncidentPriority;
    confidence: number;
  }
  keyIndicators: string[];
}