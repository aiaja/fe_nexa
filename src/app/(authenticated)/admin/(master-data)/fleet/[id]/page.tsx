"use client";

import { useParams } from "next/navigation";
import FleetDetail from "@/features/admin/(master-data)/fleet/detail-page/fleet-detail";
import { fleetData } from "@/data/admin/fleet";

export default function Page() {
  const params = useParams();
  const fleetId = params.id as string;

  const fleet = fleetData.find((f) => f.id === fleetId);

  return <FleetDetail fleet={fleet || null} fleetId={fleetId} />;
}
