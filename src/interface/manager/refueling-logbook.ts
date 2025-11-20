export interface RefuelingLogbook {
  id: string; //F-001, F-002
  driver_id: string;
  date: Date;
  fleet_id: string;
  name: string;
  location: string;
  fuel_before: number; 
  fuel_after: number;
  status: RefuelingStatus;
}

export type RefuelingStatus = 
  | "Validated" 
  | "Pending" 
  | "Rejected" 