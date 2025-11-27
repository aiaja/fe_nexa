"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DriverAnalytics } from "@/interface/auditor/driveranalytics";
import {
  createSelectionColumn,
  createTextColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<DriverAnalytics>[] = [
  createSelectionColumn<DriverAnalytics>(),

  createTextColumn<DriverAnalytics>("driverID", "Driver ID", {
    fontWeight: "medium",
  }),

  createTextColumn<DriverAnalytics>("name", "Name"),

  createTextColumn<DriverAnalytics>("incident", "Incident"),

  createTextColumn<DriverAnalytics>("riskScore", "Risk Score"),

  createStatusColumn<DriverAnalytics>("status", "Status", {
    Active: "bg-green-100 text-green-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-100 text-red-700",
    "On Leave": "bg-blue-100 text-blue-700",
  }),

  createActionsColumn<DriverAnalytics>(),
];
