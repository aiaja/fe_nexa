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
    "CRITICAL": "bg-green-100 text-green-700",
    "HIGH": "bg-red-100 text-red-700",
    "MEDIUM": "bg-orange-100 text-orange-700",
    "LOW": "bg-yellow-100 text-yellow-700",
  }),

  createActionsColumn<DriverAnalytics>(),
];
