export interface FleetData {
  id: string;
  type: FleetType;
  make: string;
  brands: string;
  year: string;
  status: FleetStatus;
}

export type FleetType = 
  | "Haul Truck" 
  | "Dump Truck" 
  | "Tanker"
  | "Excavator"
  | "Bulldozer"
  | "Loader"

export type FleetStatus = 
  | "Active" 
  | "Inactive" 
  | "Maintenance" 
  | "Under Review"
  | "Retired"