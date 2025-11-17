"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DriverData } from "@/interface/admin/driver"
import { 
  createSelectionColumn, 
  createTextColumn, 
  createStatusColumn, 
  createActionsColumn 
} from "@/components/columns-helper"

export const columns: ColumnDef<DriverData>[] = [

  createSelectionColumn<DriverData>(),


  createTextColumn<DriverData>("id", "Driver ID", {
    fontWeight: "medium"
  }),


  createTextColumn<DriverData>("name", "Name"),


  createTextColumn<DriverData>("simNumber", "License Number"),


  createTextColumn<DriverData>("phone", "Phone"),

  createStatusColumn<DriverData>("status", "Status", {
    "Active": "bg-green-100 text-green-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    "Suspended": "bg-red-100 text-red-700",
    "On Leave": "bg-blue-100 text-blue-700",
  }),

  createActionsColumn<DriverData>(),
]