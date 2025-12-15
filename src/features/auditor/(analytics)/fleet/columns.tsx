"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FleetAnalytics } from "@/interface/auditor/fleet";
import {
  createSelectionColumn,
  createTextColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<FleetAnalytics>[] = [
  createSelectionColumn<FleetAnalytics>(),

  createTextColumn<FleetAnalytics>("id", "ID", {
    fontWeight: "medium",
  }),

  createTextColumn<FleetAnalytics>("fleetId", "fleet ID"),

  createTextColumn<FleetAnalytics>("make", "Make"),

  createTextColumn<FleetAnalytics>("issues", "Issues"),

  createStatusColumn<FleetAnalytics>("status", "Status", {
    "ACTIVE": "bg-green-100 text-green-700",
    "INACTIVE": "bg-red-100 text-red-700",
    "UNDER WATCH": "bg-orange-100 text-orange-700",
    "MONITORING": "bg-yellow-100 text-yellow-700",
  }),

  createActionsColumn<FleetAnalytics>(),
];
