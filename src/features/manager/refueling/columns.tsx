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
  createTextColumn<RefuelingLogbook>("transactionCode", "Transaction Code"),
  
  createTextColumn<RefuelingLogbook>("driverId", "Driver ID"),
  createTextColumn<RefuelingLogbook>("name", "Driver Name"),
  createTextColumn<RefuelingLogbook>("fleetId", "Fleet ID"),

  createTextColumn<RefuelingLogbook>("fuelBefore", "Fuel Before"),
  createTextColumn<RefuelingLogbook>("fuelAfter", "Fuel After"),
  createTextColumn<RefuelingLogbook>("location", "Location"),

  createActionsColumn<RefuelingLogbook>(),
];
