"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DriverAnalytics } from "@/interface/auditor/driver";
import {
  createSelectionColumn,
  createTextColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<DriverAnalytics>[] = [
  createSelectionColumn<DriverAnalytics>(),

  createTextColumn<DriverAnalytics>("rank", "Rank", {
    fontWeight: "medium",
  }),

  createTextColumn<DriverAnalytics>("driverId", "Driver ID"),

  createTextColumn<DriverAnalytics>("name", "Name"),

  createTextColumn<DriverAnalytics>("incidents", "Incidents"),

  createTextColumn<DriverAnalytics>("riskScore", "Risk Score"),

  createStatusColumn<DriverAnalytics>("riskLevel", "Risk Level", {
    "CRITICAL": "bg-red-100 text-red-700",
    "HIGH": "bg-orange-100 text-orange-700",
    "MEDIUM": "bg-yellow-100 text-yellow-700",
    "LOW": "bg-blue-100 text-blue-700",
  }),

  createActionsColumn<DriverAnalytics>(),
];
