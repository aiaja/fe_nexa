"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CaseSummary as CaseSummaryType } from "@/interface/auditor/incident-reports/investigation";

interface CaseSummaryProps {
  summary: CaseSummaryType;
  title: string;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
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

export function CaseSummary({ summary, title }: CaseSummaryProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Go back"
          title="Go back">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {summary.caseId} - Under Investigation
          </h1>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      {/* Case Summary */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Case Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Case ID</p>
            <p className="text-sm font-medium text-gray-900">
              {summary.caseId}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Type</p>
            <p className="text-sm font-medium text-gray-900">{summary.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Fleet</p>
            <p className="text-sm font-medium text-gray-900">{summary.fleet}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Driver</p>
            <p className="text-sm font-medium text-gray-900">
              {summary.driver}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Date</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-900">
                {summary.date}
              </p>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(
                  summary.severity
                )}`}
              >
                {summary.severity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
