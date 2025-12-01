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
import { Incident as IncidentType, IncidentSeverity, IncidentStatus } from "@/interface/auditor/fleet";

interface IncidentProps {
  incidents: IncidentType[];
}

const severityColors: Record<IncidentSeverity, string> = {
  CRITICAL: "bg-red-600 text-white hover:bg-red-600",
  HIGH: "bg-gray-900 text-white hover:bg-gray-900",
  MEDIUM: "bg-yellow-600 text-white hover:bg-yellow-600",
  LOW: "bg-blue-600 text-white hover:bg-blue-600",
};

const statusColors: Record<IncidentStatus, string> = {
  "Under Investigation": "border-orange-500 text-orange-700 bg-orange-50",
  Confirmed: "border-green-600 text-green-700 bg-green-50",
  Resolved: "border-gray-600 text-gray-700 bg-gray-50",
  Dismissed: "border-gray-400 text-gray-600 bg-gray-50",
};

export default function Incident({ incidents }: IncidentProps) {
  if (incidents.length === 0) {
    return (
      <Card className="p-12 text-center border-gray-200">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-500">No Incidents</p>
        <p className="text-sm text-gray-400 mt-2">
          No incidents recorded for this fleet
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

      <Card className="overflow-hidden border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Incident #</TableHead>
                <TableHead className="font-semibold">Severity</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Driver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{incident.date}</TableCell>
                  <TableCell className="text-sm font-mono text-gray-600">
                    {incident.incidentNumber}
                  </TableCell>
                  <TableCell>
                    <Badge className={severityColors[incident.severity]}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`border-2 ${statusColors[incident.status]}`}
                    >
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{incident.title}</TableCell>
                  <TableCell className="text-sm max-w-xs">
                    {incident.description}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>{incident.driver.name}</div>
                    <div className="text-gray-500">({incident.driver.id})</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
