"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IncidentReport } from "@/interface/auditor/incident-reports/incidents";
import {
  createSelectionColumn,
  createTextColumn,
  createStatusColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<IncidentReport>[] = [
  createSelectionColumn<IncidentReport>(),

  createTextColumn<IncidentReport>("caseNumber", "CaseNumber", {
    fontWeight: "medium",
  }),

  createTextColumn<IncidentReport>("title", "Title"),

  {
    accessorKey: "fleetDriver",
    header: "Fleet/Driver",
    cell: ({ row }) => {
      const fleet = row.original.fleet;
      const driver = row.original.driver;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{fleet.fleetId}</span>
          <span className="text-sm text-gray-500">{driver.name}</span>
        </div>
      );
    },
  },

  createTextColumn<IncidentReport>("category", "Category"),

  createStatusColumn<IncidentReport>("severity", "Severity", {
    "CRITICAL": "bg-red-100 text-red-700",
    "HIGH": "bg-orange-100 text-orange-700",
    "MEDIUM": "bg-yellow-100 text-yellow-700",
  }),

  createTextColumn<IncidentReport>("detectionDate", "Detection Time"),

  createTextColumn<IncidentReport>("confidence", "Confidence"),

  createActionsColumn<IncidentReport>(),
];
