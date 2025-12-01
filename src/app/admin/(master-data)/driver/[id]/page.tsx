"use client";

import { useParams } from "next/navigation";
import DriverDetailAnalytics from "@/features/auditor/(analytics)/driver/view-detail/detail-data";
import { DriverAnalyticsData } from "@/data/auditor/driver-analytics";

export default function Page() {
  const params = useParams();
  const driverId = params.id as string;

  const driver = DriverAnalyticsData.find((item) => item.driverId === driverId) || null;

  return <DriverDetailAnalytics driver={driver} />;
}
