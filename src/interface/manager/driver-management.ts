export interface DriverManagement {
  id: string;                    
  name: string;            
  phone: string;                     
  assigned_fleet: string;
  hos: number;
  cur_location: string;                  
  status: DriverDeliveryStatus;              
}

export type DriverDeliveryStatus = 
  | "On Duty" 
  | "On Break"
  | "Off Duty"
  | "On Leave"  