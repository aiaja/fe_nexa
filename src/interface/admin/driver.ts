export interface DriverData {
  id: string;
  photo?: string;                    
  name: string;
  simNumber: string;                 
  license: LicenseType;              
  assignedTruck?: string;            
  phone: string;                     
  email?: string;                    
  address?: string;                  
  joinDate: string;                  
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
  | "On Leave"  