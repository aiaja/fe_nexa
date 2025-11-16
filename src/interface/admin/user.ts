export interface UserData {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  status: UserStatus;
}

export type RoleType = 
  | "Super Admin" 
  | "Auditor" 
  | "Supervisor"
  | "Manager"

export type UserStatus = 
  | "Active" 
  | "Under Review"
  | "Suspended"