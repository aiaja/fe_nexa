"use client";

import { Fuel } from "lucide-react";
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
import { RefuelingRecord } from "@/interface/auditor/fleet";

interface RefuelingProps {
  records: RefuelingRecord[];
}

export default function Refueling({ records }: RefuelingProps) {
  if (records.length === 0) {
    return (
      <Card className="p-12 text-center border-gray-200">
        <Fuel className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-500">No Refueling History</p>
        <p className="text-sm text-gray-400 mt-2">
          No refueling records available for this fleet
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Fuel className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">Refueling History</h2>
      </div>

      <Card className="overflow-hidden border-gray-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Date & Time</TableHead>
                <TableHead className="font-semibold">Station</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Liters</TableHead>
                <TableHead className="font-semibold">Price/L</TableHead>
                <TableHead className="font-semibold">Total Cost</TableHead>
                <TableHead className="font-semibold">Receipt #</TableHead>
                <TableHead className="font-semibold">Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {record.date}
                      </div>
                      <div className="text-sm text-gray-500">{record.time}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{record.station}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{record.location}</div>
                      <div className="text-gray-500">{record.coordinates}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    >
                      {record.liters}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{record.pricePerLiter}</TableCell>
                  <TableCell className="font-semibold">{record.totalCost}</TableCell>
                  <TableCell className="text-sm font-mono text-gray-600">
                    {record.receiptNumber}
                  </TableCell>
                  <TableCell>{record.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}