"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { ReportTable } from "@/interface/manager/reports";
import {
  createSelectionColumn,
  createTextColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<ReportTable>[] = [
  createSelectionColumn<ReportTable>(),

  createTextColumn<ReportTable>("id", "Report ID"),
  
  createTextColumn<ReportTable>("driver_id", "Driver ID"),
  createTextColumn<ReportTable>("name", "Driver Name"),
  createTextColumn<ReportTable>("fleet_id", "Fleet ID"),

  createTextColumn<ReportTable>("score", "Score"),
  createTextColumn<ReportTable>("total_case", "Total Case"),
  
  createActionsColumn<ReportTable>(),
];
