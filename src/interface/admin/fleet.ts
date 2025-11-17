export interface FleetData {
  id: string
  plateNumber: string
  photo?: string
  type: FleetType
  brands: string
  model: string
  year: string
  purchaseDate?: string
  initialMileage?: number
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