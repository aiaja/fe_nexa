export interface DriverData {
  id: string; // pake uid
  driverID: string; // ini DRV-001
  photo?: string;                    
  name: string;
  licenseNumber: string;                 
  licenseType: LicenseType;              
  assignedTruck?: string;            
  phone: string;  
  email?: string;                    
  address?: string;                  
  joinDate: string;                  
  incidentCount: number;                  
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