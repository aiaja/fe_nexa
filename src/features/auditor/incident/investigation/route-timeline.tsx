"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowBigUp, AlertTriangle, Truck } from "lucide-react";
import { IncidentInvestigationLog, IncidentSaverity } from "@/interface/auditor/incident-reports/investigation";

interface RouteTimelineProps {
  events: IncidentInvestigationLog[];
}

const eventIcon = {
  CRITICAL: <AlertTriangle className="h-5 w-5" />,
  HIGH: <ArrowBigUp className="h-5 w-5" />,
  MEDIUM: <Truck className="h-5 w-5" />,
} satisfies Record<IncidentSaverity, React.ReactNode>;

const iconBgColor: Record<IncidentSaverity, string> = {
  CRITICAL: "bg-red-100 text-red-600",
  HIGH: "bg-orange-100 text-orange-600",
  MEDIUM: "bg-yellow-100 text-yellow-600",
};

const borderColor: Record<IncidentSaverity, string> = {
  CRITICAL: "border-red-300",
  HIGH: "border-orange-300",
  MEDIUM: "border-yellow-300",
};

const bgColor: Record<IncidentSaverity, string> = {
  CRITICAL: "bg-red-50",
  HIGH: "bg-orange-50",
  MEDIUM: "bg-yellow-50",
};

export function RouteTimeline({ events }: RouteTimelineProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-base font-semibold mb-6">Route Timeline</h2>

        <div className="space-y-0">
          {events.map((event, index) => {
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="flex gap-4">
                
                {/* Timeline Left Section */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor[event.saverity]}`}
                  >
                    {eventIcon[event.saverity]}
                  </div>

                  {!isLast && (
                    <div
                      className={`w-0.5 h-full min-h-[60px] border-l-2 ${borderColor[event.saverity]} my-2`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-8`}>
                  <div
                    className={`p-4 rounded-lg border ${bgColor[event.saverity]} ${borderColor[event.saverity]}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold mb-1">
                          {event.time}
                        </p>

                        <p className="text-sm font-medium">{event.location}</p>

                        {event.saverity === "CRITICAL" && (
                          <Badge className="mt-2 bg-red-600 text-white">
                            CRITICAL EVENT
                          </Badge>
                        )}
                      </div>

                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={iconBgColor[event.saverity]}
                        >
                          {event.saverity}
                        </Badge>
                      </div>
                    </div>

                    {/* Detail List */}
                    <ul className="space-y-1 mt-3">
                      {event.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-gray-400">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}