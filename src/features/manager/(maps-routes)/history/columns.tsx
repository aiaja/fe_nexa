"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { DeliveryHistory } from "@/interface/manager/delivery-history";
import {
  createSelectionColumn,
  createTextColumn,
  createActionsColumn,
} from "@/components/columns-helper";

export const columns: ColumnDef<DeliveryHistory>[] = [
  createSelectionColumn<DeliveryHistory>(),

  createTextColumn<DeliveryHistory>("date", "Date", {
    fontWeight: "medium",
  }),

  createTextColumn<DeliveryHistory>("id", "Driver ID"),
  createTextColumn<DeliveryHistory>("name", "Driver Name"),
  createTextColumn<DeliveryHistory>("fleet_id", "Fleet Info"),

  createTextColumn<DeliveryHistory>("location", "Location"),

  createActionsColumn<DeliveryHistory>(),
];
