export interface FleetData {
  id: string
  //fleetId: string
  plateNumber: string //ganti jd licensePlate
  photo?: string
  type: FleetType
  brands: string
  model: string
  year: string
  purchaseDate?: string //takeout
  initialMileage?: number //takeout
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