import { z } from "zod"
import { LicenseType, DriverStatus } from "@/interface/admin/driver"

// Zod Schema untuk validasi form
export const driverSchema = z.object({
  photo: z.string().optional(),
  name: z.string().min(1, "Full name is required"),
  licenseNumber: z.string()
    .min(1, "License number is required")
    .regex(/^\d{4}-\d{4}-\d{6}$/, "License number must follow format: XXXX-XXXX-XXXXXX"),
  licenseType: z.enum(["A", "B1", "B2", "C"])
  .refine((val) => val !== undefined, {
    message: "Please select a license type"
  }),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^(\+62|62|0)[8][0-9]{8,11}$/, "Invalid phone format. Use: 08xx or +628xx"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  address: z.string().optional(),
  assignedTruck: z.string().optional(), 
  joinDate: z.string().min(1, "Join date is required"),
  status: z.enum(["Active", "Under Review", "Suspended", "On Leave"])
})

// Type yang di-infer dari schema
export type DriverFormData = z.infer<typeof driverSchema>

// Konstanta untuk dropdown options
export const LICENSE_TYPES: LicenseType[] = ["A", "B1", "B2", "C"]

export const DRIVER_STATUSES: DriverStatus[] = [
  "Active",
  "Under Review",
  "Suspended",
  "On Leave"
]