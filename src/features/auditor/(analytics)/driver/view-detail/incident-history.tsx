"use client";

import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Incident {
  id: string;
  date: string;
  type: string;
  severity: string;
  description: string;
  resolution: string;
}

interface IncidentHistoryProps {
  incidents: Incident[];
}

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-600 text-white hover:bg-red-600",
  HIGH: "bg-orange-600 text-white hover:bg-orange-600",
  MEDIUM: "bg-yellow-600 text-white hover:bg-yellow-600",
  LOW: "bg-blue-600 text-white hover:bg-blue-600",
};

const resolutionColors: Record<string, string> = {
  "Under Review": "border-red-500 text-red-700 bg-red-50",
  Investigation: "border-orange-500 text-orange-700 bg-orange-50",
  Resolved: "border-green-500 text-green-700 bg-green-50",
};

export default function IncidentHistory({ incidents }: IncidentHistoryProps) {
  if (incidents.length === 0) {
    return (
      <Card className="p-12 text-center border-gray-200">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-500">No Incident History</p>
        <p className="text-sm text-gray-400 mt-2">
          No incidents recorded for this driver
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">Incident History</h2>
      </div>

      <Card className="border-gray-200">
        <div className="p-6 space-y-4">
          {incidents.map((incident, index) => (
            <div
              key={incident.id}
              className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                index !== incidents.length - 1 ? "mb-4" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge className={severityColors[incident.severity] || "bg-gray-500"}>
                    {incident.severity}
                  </Badge>
                  <span className="text-sm text-gray-500">{incident.date}</span>
                  <Badge
                    variant="outline"
                    className={`border-2 ${
                      resolutionColors[incident.resolution] || "border-gray-500"
                    }`}
                  >
                    {incident.resolution}
                  </Badge>
                </div>
                <span className="text-sm text-gray-400">{incident.id}</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">{incident.type}</h3>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Description:
                </p>
                <p className="text-sm text-gray-700">{incident.description}</p>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-gray-500">Resolution:</span>
                <span className="font-medium text-gray-700">
                  {incident.resolution}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}