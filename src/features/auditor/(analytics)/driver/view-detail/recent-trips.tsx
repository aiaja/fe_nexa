"use client";

import { Truck } from "lucide-react";
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

interface Trip {
  date: string;
  fleetId: string;
  route: string;
  distance: string;
  fuelUsed: string;
  duration: string;
  status: string;
}

interface RecentTripsProps {
  trips: Trip[];
}

const statusColors: Record<string, string> = {
  Completed: "bg-green-100 text-green-700 hover:bg-green-100",
  Normal: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Alert: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function RecentTrips({ trips }: RecentTripsProps) {
  if (trips.length === 0) {
    return (
      <Card className="p-12 text-center border-gray-200">
        <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-500">No Recent Trips</p>
        <p className="text-sm text-gray-400 mt-2">
          No trip history available for this driver
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Truck className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">Recent Trips</h2>
      </div>

      <Card className="overflow-hidden border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Fleet ID</TableHead>
                <TableHead className="font-semibold">Route</TableHead>
                <TableHead className="font-semibold">Distance</TableHead>
                <TableHead className="font-semibold">Fuel Used</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{trip.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {trip.fleetId}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{trip.route}</TableCell>
                  <TableCell className="text-sm">{trip.distance}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    >
                      {trip.fuelUsed}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{trip.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[trip.status] || "bg-gray-100"}
                    >
                      {trip.status}
                    </Badge>
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