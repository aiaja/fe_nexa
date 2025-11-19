"use client";

import React from "react";
import { IncidentReport } from "@/interface/auditor/incident-reports/incidents";
import { DismissButton } from "@/features/auditor/incident/actions/dismiss-button";

interface ReportTableProps {
  incidents: IncidentReport[];
  onInvestigate?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const getPriorityBadgeColor = (priority: string) => {
  switch (priority) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "LOW":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function ReportTable({ incidents, onInvestigate, onDismiss }: ReportTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <label htmlFor="selectAll" className="sr-only">
                  Select all
                </label>
                <input
                  id="selectAll"
                  type="checkbox"
                  className="rounded border-gray-300"
                />
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Case Number
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Fleet/Driver
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Detection Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Confidence
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((incident, index) => (
              <tr
                key={incident.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-4">
                  <label htmlFor={`select-${incident.id}`} className="sr-only">
                    Select row {incident.id}
                  </label>

                  <input
                    id={`select-${incident.id}`}
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  {incident.id}
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  {incident.title}
                </td>

                <td className="px-4 py-4 text-sm text-gray-600">
                  <div>{incident.fleet.id}</div>
                  <div className="text-xs text-gray-500">
                    {incident.driver.name}
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  {incident.category}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(
                      incident.priority
                    )}`}
                  >
                    {incident.priority}
                  </span>
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  {incident.detectionDate}
                </td>

                <td className="px-4 py-4 text-sm text-gray-900">
                  {incident.severity.confidence}%
                </td>

                <td className="px-4 py-4">
                  <button
                    onClick={() => onInvestigate?.(incident.id)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Investigate
                  </button>
                </td>

                <td className="px-4 py-4">
                  <DismissButton
                    incidentId={incident.id}
                    incidentTitle={incident.title}
                    onDismissed={onDismiss}
                    className="!px-0 !py-0 w-10 h-10 !bg-transparent"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
