"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { FleetManagement } from "@/interface/manager/fleet-management"
import { 
  createSelectionColumn, 
  createTextColumn, 
  createStatusColumn, 
  createActionsColumn 
} from "@/components/columns-helper"

export const columns: ColumnDef<FleetManagement>[] = [

  createSelectionColumn<FleetManagement>(),

  createTextColumn<FleetManagement>("id", "Fleet ID", {
    fontWeight: "medium"
  }),

  createTextColumn<FleetManagement>("fuel", "Fuel"),

  createTextColumn<FleetManagement>("location", "Location"),

  createTextColumn<FleetManagement>("speed", "Speed"),
  createTextColumn<FleetManagement>("fuel_consumption", "Fuel Consump."),

  createStatusColumn<FleetManagement>("status", "Status", {
    "Active": "bg-green-100 text-green-700",
    "Idle": "bg-gray-100 text-gray-700",
    "Refueling": "bg-yellow-100 text-yellow-700",
    "Inactive": "bg-red-100 text-red-700",
  }),

  createActionsColumn<FleetManagement>(),
]