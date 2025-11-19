export interface FleetManagement {
  id: string; //F-001, F-002
  fuel: number; //percentage
  location: string;
  speed: number; //km/h
  fuel_consumption: number; //L/h
  status: FleetManagementStatus;
}

export type FleetManagementStatus = 
  | "Active" 
  | "Inactive" 
  | "Idle" 
  | "Refueling"