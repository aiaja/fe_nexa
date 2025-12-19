"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ScheduleData } from "@/interface/manager/schedule";
import { format } from "date-fns";
import {
  createSelectionColumn,
  createTextColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<ScheduleData>[] = [
  createSelectionColumn<ScheduleData>(),

  createTextColumn<ScheduleData>("scheduleId", "Schedule ID", {
    fontWeight: "medium",
  }),

  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) =>
      format(new Date(row.getValue("startTime")), "dd MMM yyyy HH:mm"),
  },

  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) =>
      format(new Date(row.getValue("endTime")), "dd MMM yyyy HH:mm"),
  },

  createTextColumn<ScheduleData>("driverId", "Driver ID"),
  createTextColumn<ScheduleData>("driverName", "Driver Name"),
  createTextColumn<ScheduleData>("startPoint", "Start Point"),
  createTextColumn<ScheduleData>("endPoint", "End Point"),
  createTextColumn<ScheduleData>("fleetId", "Fleet ID"),

  createActionsColumn<ScheduleData>(),
];
