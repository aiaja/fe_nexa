import React from "react";
import { incidentItem } from "@/data/auditor/dashboard";

export interface RecentIncident {
  id: string;
  truck: string;
  datetime: string;
  type: string;
  loss: string;
  status: "Critical" | "High" | "Medium";
}

interface IncidentsProps {
  data: RecentIncident[];
}

const getStatusColor = (status: RecentIncident["status"]): string => {
  const statusColors: Record<RecentIncident["status"], string> = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
  };
  return statusColors[status] || "bg-gray-100 text-gray-700";
};

export function Incidents({ data }: IncidentsProps) {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Incident ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Truck-ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Date/Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Fuel Loss (L)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((incident, index) => (
              <tr
                key={incident.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {incident.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {incident.truck}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {incident.datetime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {incident.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b border-gray-200">
                  {incident.loss}
                </td>

                <td className="px-6 py-4 text-sm border-b border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                      incident.status
                    )}`}
                  >
                    {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
