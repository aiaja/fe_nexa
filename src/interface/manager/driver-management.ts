export interface DriverManagement {
  id: string;                    
  name: string;            
  phone: string;                     
  assignedFleet: string;
  hos: number;             
  status: DriverDeliveryStatus;              
}

export type DriverDeliveryStatus = 
  | "On Duty" 
  | "On Break"
  | "Off Duty"
  | "On Leave"  