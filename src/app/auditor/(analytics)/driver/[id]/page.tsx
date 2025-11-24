"use client";

import { useParams } from 'next/navigation';
import DriverDetailPage from '@/features/auditor/(analytics)/driver/detail-page/view-detail';
import { driverDetailData } from '@/data/auditor/driver-analytics';

export default function Page() {
  const params = useParams();
  const driverId = params.id as string;
  
  const driver = driverDetailData[driverId];

  if (!driver) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Driver Not Found</h2>
          <p className="text-gray-600 mb-4">The driver with ID "{driverId}" does not have detail data available yet.</p>
          <button
            onClick={() => window.history.back()}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Driver List
          </button>
        </div>
      </div>
    );
  }

  return <DriverDetailPage driver={driver} />;
}
