import { z } from "zod"
import { FleetType, FleetStatus } from "@/interface/admin/fleet"

// Zod Schema untuk validasi form
export const fleetSchema = z.object({
  licensePlate: z.string()
    .min(1, "License plate is required")
    .regex(/^[A-Z]{1,2}\s\d{1,4}\s[A-Z]{1,3}$/, "Invalid format. Use: B 1234 ABC"),
  photo: z.string().optional(),
  type: z.enum(["Haul Truck", "Dump Truck", "Tanker", "Excavator", "Bulldozer", "Loader"])
    .refine((val) => val !== undefined, {
      message: "Please select a fleet type"
    }),
  brands: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  status: z.enum(["Active", "Inactive", "Maintenance", "Under Review"])
})

// Type yang di-infer dari schema
export type FleetFormData = z.infer<typeof fleetSchema>

// Konstanta untuk dropdown options
export const FLEET_TYPES: FleetType[] = [
  "Haul Truck",
  "Dump Truck", 
  "Tanker",
  "Excavator",
  "Bulldozer",
  "Loader"
]

export const FLEET_STATUSES: FleetStatus[] = [
  "Active",
  "Inactive",
  "Maintenance",
  "Under Review"
]

export const FLEET_YEARS = Array.from(
  { length: 15 },
  (_, i) => (new Date().getFullYear() - i).toString()
)