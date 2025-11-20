export interface RefuelingLogbook { //ambil dari fuel transaction
  id: string; //F-001, F-002
  //transactionCode unique
  driver_id: string;
  fleet_id: string;
  location: string;
  fuel_before: number; //fuelBefore 
  fuel_after: number; //fuelAfter
  date: Date; //timestamp
  name: string; //ambil dari driver Name
  status: RefuelingStatus;
}

export type RefuelingStatus = 
  | "Validated" 
  | "Pending" 
  | "Rejected" 