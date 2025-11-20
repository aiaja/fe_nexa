"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { RefuelingLogbook } from "@/interface/manager/refueling-logbook";
import {
  createSelectionColumn,
  createTextColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<RefuelingLogbook>[] = [
  createSelectionColumn<RefuelingLogbook>(),

  createTextColumn<RefuelingLogbook>("id", "Refueling ID"),
  createTextColumn<RefuelingLogbook>("date", "Date", {
    fontWeight: "medium",
  }),
  
  createTextColumn<RefuelingLogbook>("driver_id", "Driver ID"),
  createTextColumn<RefuelingLogbook>("name", "Driver Name"),
  createTextColumn<RefuelingLogbook>("fleet_id", "Fleet ID"),

  createTextColumn<RefuelingLogbook>("fuel_before", "Fuel Before"),
  createTextColumn<RefuelingLogbook>("fuel_after", "Fuel After"),
  createTextColumn<RefuelingLogbook>("location", "Location"),

  createActionsColumn<RefuelingLogbook>(),
];
