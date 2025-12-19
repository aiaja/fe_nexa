"use client"

import { ColumnDef } from "@tanstack/react-table"
import { FleetData } from "@/interface/admin/fleet"
import { 
  createSelectionColumn, 
  createTextColumn, 
  createStatusColumn, 
  createActionsColumn 
} from "@/components/columns-helper"

export const columns: ColumnDef<FleetData>[] = [

  createSelectionColumn<FleetData>(),

  createTextColumn<FleetData>("fleetId", "Fleet ID", {
    fontWeight: "medium"
  }),

  createTextColumn<FleetData>("licensePlate", "Plate Number"),

  createTextColumn<FleetData>("brands", "Brands"),

  createTextColumn<FleetData>("model", "Model"),

  createStatusColumn<FleetData>("status", "Status", {
    "Active": "bg-green-100 text-green-700",
    "Inactive": "bg-gray-100 text-gray-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    "Maintenance": "bg-orange-100 text-orange-700",
  }),

  createActionsColumn<FleetData>(),
]