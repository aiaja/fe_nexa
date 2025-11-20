export interface DriverData {
  id: string;
  //tambah driverID
  photo?: string;                    
  name: string;
  simNumber: string; // ganti ke licenseNumber                 
  license: LicenseType; // ganti ke licenseType           
  assignedTruck?: string;            
  phone: string;  
  email?: string;                    
  address?: string;                  
  joinDate: string;           
  incident: number; //ganti ke incidentCount                 
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