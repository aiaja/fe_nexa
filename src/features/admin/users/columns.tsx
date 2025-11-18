"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserData } from "@/interface/admin/user"
import { 
  createSelectionColumn, 
  createTextColumn, 
  createStatusColumn, 
  createActionsColumn 
} from "@/components/columns-helper"

export const columns: ColumnDef<UserData>[] = [

  createSelectionColumn<UserData>(),


  createTextColumn<UserData>("id", "User ID", {
    fontWeight: "medium"
  }),


  createTextColumn<UserData>("name", "Name"),


  createTextColumn<UserData>("email", "Email"),
  

  createTextColumn<UserData>("role", "Role"),

  createTextColumn<UserData>("lastLogin", "Last Login"),

  createStatusColumn<UserData>("status", "Status", {
    "Active": "bg-green-100 text-green-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    "Suspended": "bg-red-100 text-red-700",
  }),

  createActionsColumn<UserData>(),
]