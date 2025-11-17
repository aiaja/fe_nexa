export type UserRole = "Super Admin" | "Manager" | "Auditor" | "Supervisor"
export type UserStatus = "Active" | "Under Review" | "Suspended"

export interface UserData {
  id: string
  username: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastLogin?: string
  createdAt: string
}