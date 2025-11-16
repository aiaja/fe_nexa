"use client";

import React from "react";
import { IncidentReport } from "@/interface/auditor/incident-reports/incidents";

interface ReportCardProps {
  incident: IncidentReport;
  onInvestigate?: (id: string) => void;
  onQuickConfirm?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "CRITICAL":
      return "bg-red-500 text-white";
    case "HIGH":
      return "bg-orange-500 text-white";
    case "MEDIUM":
      return "bg-yellow-500 text-white";
    case "LOW":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "SUDDEN DROP":
      return "bg-red-100 text-red-700";
    case "OUT OF ZONE":
      return "bg-orange-100 text-orange-700";
    case "OVERCONSUMPTION":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function ReportCard({
  incident,
  onInvestigate,
  onQuickConfirm,
  onDismiss,
}: ReportCardProps) {
  return (
    <div className="border-2 border-blue-500 rounded-lg bg-white p-6 shadow-sm">
      {/* Header with Tags */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${getPriorityColor(
            incident.priority
          )}`}
        >
          {incident.priority}
        </span>
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${getCategoryColor(
            incident.category
          )}`}
        >
          {incident.category}
        </span>
        <span className="ml-auto text-xs text-gray-500">{incident.id}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {incident.title}
      </h3>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Detection:</p>
          <p className="text-sm font-medium text-gray-900">
            {incident.detectionDate}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Fleet:</p>
          <p className="text-sm font-medium text-gray-900">
            {incident.fleet.id} ({incident.fleet.model})
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Driver:</p>
          <p className="text-sm font-medium text-gray-900">
            {incident.driver.name} ({incident.driver.id})
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Severity:</p>
          <p
            className={`text-sm font-medium ${
              incident.severity.level === "CRITICAL"
                ? "text-red-600"
                : incident.severity.level === "HIGH"
                ? "text-orange-600"
                : incident.severity.level === "MEDIUM"
                ? "text-yellow-600"
                : "text-blue-600"
            }`}
          >
            {incident.severity.level} ({incident.severity.confidence}%
            confidence)
          </p>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Key Indicators :
        </p>
        <ul className="space-y-1">
          {incident.keyIndicators.map((indicator, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="text-red-500 mt-1">⚠</span>
              <span>{indicator}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onInvestigate?.(incident.id)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Investigate
        </button>
        <button
          onClick={() => onQuickConfirm?.(incident.id)}
          className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Quick Confirm
        </button>
        <button
          onClick={() => onDismiss?.(incident.id)}
          className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
