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
  //tambah caseNumber
  //tambah fleetId 
  //tambah driverId
  //tambah zoneId
  title: string;
  vehicleName: string; //diganti ke fleetID aja
  priority: IncidentPriority; //take out
  category: IncidentCategory;
  detectionDate: string;
  driver: Driver;
  fleet: Fleet;
  severity: {
    level: IncidentPriority;
    confidence: number;
  } //dipecah severity sendiri, confidence sendiri 
  keyIndicators: string[];
}