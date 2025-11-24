"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { DriverManagement } from "@/interface/manager/driver-management"
import { 
  createSelectionColumn, 
  createTextColumn, 
  createStatusColumn, 
  createActionsColumn 
} from "@/components/columns-helper"

export const columns: ColumnDef<DriverManagement>[] = [

  createSelectionColumn<DriverManagement>(),

  createTextColumn<DriverManagement>("id", "Driver Info", {
    fontWeight: "medium"
  }),

  createTextColumn<DriverManagement>("name", "Name"),
  createTextColumn<DriverManagement>("phone", "Contact"),
  createTextColumn<DriverManagement>("assignedFleet", "Assigned Fleet"),
  createTextColumn<DriverManagement>("hos", "HOS"),
  createStatusColumn<DriverManagement>("status", "Status", {
    "On Duty": "bg-green-100 text-green-700",
    "On Break": "bg-gray-100 text-gray-700",
    "Off Duty": "bg-yellow-100 text-yellow-700",
    "On Leave": "bg-red-100 text-red-700",
  }),

  createActionsColumn<DriverManagement>(),
]