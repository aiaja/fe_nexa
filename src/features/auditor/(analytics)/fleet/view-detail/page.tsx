"use client";

import { FleetDetail } from "@/interface/auditor/fleet";
import DetailData from "./detail-data";

interface FleetDetailPageProps {
  fleet: FleetDetail;
}

export default function FleetDetailPage({ fleet }: FleetDetailPageProps) {
  return <DetailData fleet={fleet} />;
}
