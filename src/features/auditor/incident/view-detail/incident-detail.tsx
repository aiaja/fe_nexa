"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  IncidentReport,
  IncidentCategory,
  IncidentSaverity,
} from "@/interface/auditor/incident-reports/incidents";

interface IncidentDetailProps {
  incident: IncidentReport | null;
}

const STORAGE_KEY = "incidents-data";

const categoryBadge: Record<IncidentCategory, string> = {
  "SUDDEN DROP": "bg-red-100 text-red-700",
  "OUT OF ZONE": "bg-orange-100 text-orange-700",
  OVERCONSUMPTION: "bg-purple-100 text-purple-700",
};

const severityBadge: Record<IncidentSaverity, string> = {
  CRITICAL: "text-red-600",
  HIGH: "text-orange-500",
  MEDIUM: "text-yellow-600",
};

export default function IncidentDetail({
  incident: initialIncident,
}: IncidentDetailProps) {
  const router = useRouter();
  const [incident, setIncident] = useState(initialIncident);
  const [isLoading, setIsLoading] = useState(!initialIncident);

  useEffect(() => {
    if (!initialIncident && typeof window !== "undefined") {
      const idFromUrl = window.location.pathname.split("/").pop();

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const incidents = parsed.incidents || parsed;
          const found = incidents.find(
            (i: IncidentReport) => i.id === idFromUrl
          );

          if (found) setIncident(found);
        }
      } catch (e) {
        console.error("Failed to load incident:", e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [initialIncident]);

  const handleQuickConfirm = () => {
    if (incident) {
      router.push(`/auditor/incident/${incident.id}/resolve`);
    }
  };

  const handleDismiss = () => {
    if (incident) {
      router.push("/auditor/incident");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold">Incident Not Found</p>
        <button
          onClick={() => router.push("/auditor/incident")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Incidents
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="p-6">
        <button
          onClick={() => router.push("/auditor/incident")}
          className="flex items-center gap-2 text-blue-700 hover:underline"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Incidents
        </button>
      </div>

      {/* Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{incident.caseNumber}</h1>
            <p className="text-gray-600 mt-1">
              {incident.fleet.model} — Truck #{incident.fleet.fleetId}
            </p>

            <span
              className={`inline-block mt-4 px-4 py-1.5 rounded-full font-semibold text-sm ${
                categoryBadge[incident.category]
              }`}
            >
              {incident.category}
            </span>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Detection */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              DETECTION
            </h3>
            <p className="text-gray-700">{incident.detectionDate}</p>
          </div>

          {/* Fleet */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">FLEET</h3>
            <p className="text-gray-700">{incident.fleet.model}</p>
            <p className="text-sm text-gray-500">({incident.fleet.fleetId})</p>
          </div>

          {/* Driver */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">DRIVER</h3>
            <p className="text-gray-700 bold">{incident.driver.name}</p>
            <p className="text-sm text-gray-500">
              ({incident.driver.driverId})
            </p>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">STATUS</h3>
            <p
              className={`${
                severityBadge[incident.severity]
              } inline-block px-2 py-1 rounded-md font-semibold`}
            >
              {incident.severity}{" "}
              <span className="ml-1 opacity-80">
                ({incident.confidence} confidence)
              </span>
            </p>
          </div>
        </div>

        {/* Key Indicators */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            KEY INDICATORS
          </h3>

          <ul className="space-y-2">
            {incident.keyIndicators.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex gap-4">
          <button
            onClick={() =>
              router.push(`/auditor/incident/${incident.id}/investigation`)
            }
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Investigate
          </button>

          <button
            onClick={handleQuickConfirm}
            className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Quick Confirm
          </button>

          <button
            onClick={handleDismiss}
            className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
