export interface RefuelingLogbook { //ambil dari fuel transaction
  id: string; 
  transactionCode: string;
  driverId: string;
  fleetId: string;
  location: string;
  fuelBefore: number; 
  fuelAfter: number; 
  date: Date; 
  name: string; //ambil dari driver Name
  status: RefuelingStatus;
}

export type RefuelingStatus = 
  | "Validated" 
  | "Pending" 
  | "Rejected" 