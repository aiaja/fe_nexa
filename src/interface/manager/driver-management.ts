export interface DriverManagement {
  id: string;                    
  name: string;            
  phone: string;                     
  assigned_fleet: string; //ganti jadi assignedFleets
  hos: number;
  cur_location: string;   //takeout               
  status: DriverDeliveryStatus;              
}

export type DriverDeliveryStatus = 
  | "On Duty" 
  | "On Break"
  | "Off Duty"
  | "On Leave"  