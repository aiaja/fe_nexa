export interface DriverData {
  id: string;
  name: string;
  license: LicenseType;
  truck_id: string;
  incident: number;
  status: DriverStatus;
}

export type LicenseType = 
  | "A" 
  | "B1" 
  | "B2"
  | "C"

export type DriverStatus = 
  | "Active" 
  | "Under Review"
  | "Suspended"