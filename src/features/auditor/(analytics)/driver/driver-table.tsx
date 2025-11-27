"use client";

import React from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { DriverAnalytics } from "@/interface/auditor/driveranalytics";

interface DriverTableProps {
  drivers: DriverAnalytics[];
  onSort?: (column: string) => void;
}

const getMedalEmoji = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return null;
  }
};

const getRiskScoreBadge = (score: number, level: string) => {
  const badges = {
    CRITICAL: "bg-red-500 text-white",
    HIGH: "bg-orange-500 text-white",
    MEDIUM: "bg-yellow-500 text-white",
    LOW: "bg-green-500 text-white",
  };

  return badges[level as keyof typeof badges] || badges.LOW;
};

const getIncidentBadge = (count: number) => {
  if (count >= 4) return "bg-red-100 text-red-700 border-red-200";
  if (count >= 2) return "bg-orange-100 text-orange-700 border-orange-200";
  if (count >= 1) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-green-100 text-green-700 border-green-200";
};

export function DriverTable({ drivers, onSort }: DriverTableProps) {
  const router = useRouter();

  const handleViewDetail = (driverId: string) => {
    router.push(`/auditor/analytics/driver/${driverId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Driver ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Incidents
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drivers.map((driver, index) => {
              const isTopThree = driver.rank <= 3;
              const medal = getMedalEmoji(driver.rank);

              return (
                <tr
                  key={driver.driverId}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                    isTopThree ? "border-l-4 border-l-yellow-400" : ""
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {medal && <span className="text-2xl">{medal}</span>}
                      <span className="text-sm font-semibold text-gray-900">
                        {driver.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {driver.driverId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{driver.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getIncidentBadge(
                        driver.incidents
                      )}`}
                    >
                      {driver.incidents}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getRiskScoreBadge(
                        driver.riskScore,
                        driver.riskLevel
                      )}`}
                    >
                      {driver.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetail(driver.driverId)}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
