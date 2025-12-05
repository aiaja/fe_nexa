"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReportCase } from "@/interface/auditor/reports";
import {
  createSelectionColumn,
  createTextColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<ReportCase>[] = [
  createSelectionColumn<ReportCase>(),

  createTextColumn<ReportCase>("id", "ID", {
    fontWeight: "medium",
  }),

  createTextColumn<ReportCase>("caseNumber", "CaseNumber", {
  }),

    createTextColumn<ReportCase>("dateTime", "Date Time", {
  }),

  {
    accessorKey: "fleetDriver",
    header: "Fleet/Driver",
    cell: ({ row }) => {
      const fleet = row.original.fleetId;
      const driver = row.original.name;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{fleet}</span>
          <span className="text-sm text-gray-500">{driver}</span>
        </div>
      );
    },
  },

  createTextColumn<ReportCase>("category", "Category"),

  createStatusColumn<ReportCase>("severity", "Severity", {
    "CRITICAL": "bg-red-100 text-red-700",
    "HIGH": "bg-orange-100 text-orange-700",
    "MEDIUM": "bg-yellow-100 text-yellow-700",
  }),

  createTextColumn<ReportCase>("resolution", "Resolution"),

  createTextColumn<ReportCase>("notes", "Notes"),

  createActionsColumn<ReportCase>(),
];
