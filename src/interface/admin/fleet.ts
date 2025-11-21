export interface FleetData {
  id: string
  fleetID: string // TRK-001
  licensePlate: string
  photo?: string
  type: FleetType
  brands: string
  model: string
  year: string
  status: FleetStatus
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