"use client";

import { useParams } from "next/navigation";
import DetailData from "@/features/auditor/(analytics)/driver/view-detail/detail-data";
import { driverDetailData } from "@/data/auditor/driver-analytics";

export default function Page() {
  const params = useParams();
  const driverId = params.id as string;

  const driver = driverDetailData.find((d) => d.id === driverId);
  if (!driver) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Driver Not Found</h1>
      </div>
    );
  }

  return <DetailData driver={driver} />;
}
