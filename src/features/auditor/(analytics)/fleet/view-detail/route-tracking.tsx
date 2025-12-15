"use client";

import { MapPin, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RouteHistory } from "@/interface/auditor/fleet";
import { cn } from "@/lib/utils";

interface RouteTrackingProps {
  routes: RouteHistory[];
}

export default function RouteTracking({ routes }: RouteTrackingProps) {
  if (routes.length === 0) {
    return (
      <Card className="p-12 text-center border-gray-200">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-500">No Route History</p>
        <p className="text-sm text-gray-400 mt-2">
          No route tracking data available for this fleet
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900">Route Tracking History</h2>
      </div>

      {routes.map((route) => (
        <Card key={route.id} className="p-6 border-gray-200">
          {/* Route Header */}
          <div className="flex items-start justify-between mb-6 pb-4 border-b">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {route.from} → {route.to}
                {route.hasAnomaly && (
                  <Badge variant="destructive" className="ml-2">
                    Anomaly Detected
                  </Badge>
                )}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {route.date} · {route.startTime} - {route.endTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Distance: {route.distance}</p>
              <p className="text-sm text-gray-500">Fuel Used: {route.fuelUsed}</p>
            </div>
          </div>

          {/* Checkpoints Timeline */}
          <div className="pl-4">
            {route.checkpoints.map((checkpoint, index) => {
              const isAnomaly = checkpoint.type === "anomaly";
              const isLast = index === route.checkpoints.length - 1;

              return (
                <div key={checkpoint.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2",
                        isAnomaly
                          ? "bg-red-500 border-red-500"
                          : "bg-white border-gray-300"
                      )}
                    />
                    {!isLast && <div className="w-0.5 h-16 bg-gray-200" />}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "flex-1 pb-8",
                      isAnomaly && "bg-red-50 -ml-4 pl-4 pr-4 py-2 rounded-lg"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {checkpoint.name}
                          {isAnomaly && (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Fuel: {checkpoint.fuel} · {checkpoint.coordinates}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {checkpoint.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}