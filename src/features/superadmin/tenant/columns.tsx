"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TenantWithCounts } from "@/interface/superadmin/tenant"
import { 
  createSelectionColumn, 
  createTextColumn, 
  createStatusColumn, 
  createActionsColumn,
  createDateColumn
} from "@/components/columns-helper"

export const columns: ColumnDef<TenantWithCounts>[] = [

  createSelectionColumn<TenantWithCounts>(),

  createTextColumn<TenantWithCounts>("company_name", "Company Name", {
    fontWeight: "medium"
  }),


  createTextColumn<TenantWithCounts>("email", "Email"),


  createStatusColumn<TenantWithCounts>("plan", "Plan", {
    "FREE": "bg-gray-100 text-gray-700",
    "STARTER": "bg-blue-100 text-blue-700",
    "BUSINESS": "bg-purple-100 text-purple-700",
    "ENTERPRISE": "bg-yellow-100 text-yellow-700",
  }),

  createStatusColumn<TenantWithCounts>("tenantStatus", "Status", {
    "ACTIVE": "bg-green-100 text-green-700",
    "TRIAL": "bg-blue-100 text-blue-700",
    "SUSPENDED": "bg-red-100 text-red-700",
    "EXPIRED": "bg-orange-100 text-orange-700",
    "INACTIVE": "bg-gray-100 text-gray-700",
  }),

  createDateColumn<TenantWithCounts>("createdAt", "Registered"),

  createActionsColumn<TenantWithCounts>(),
]
