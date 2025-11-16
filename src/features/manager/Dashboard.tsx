import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DashboardAnomaly,
  DashboardOverview,
} from "@/interface/manager/dashboard";

interface DashboardProps {
  overviewItems: DashboardOverview[];
  anomalyItems: DashboardAnomaly[];
}

function Dashboard({ overviewItems, anomalyItems }: DashboardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold leading-8">
        Fleet Management Overview
      </div>
      <div className="grid grid-cols-4 gap-2">
        {overviewItems.map((item) => {
          return (
            <Card className="gap-0 h-fit" key={item.title}>
              <CardHeader className="text-base font-semibold">
                {item.title}
              </CardHeader>
              <CardContent className="text-3xl font-semibold">
                {item.value}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="text-xl font-semibold leading-8">
        Live Maps & Anomaly Alerts
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Card className="gap-0 bg-slate-500">MAPS</Card>
        <div className="grid grid-cols-1 gap-2">
          {anomalyItems.map((item) => {
            return (
              <Card className="gap-0 h-" key={item.title}>
                <CardHeader className="text-base font-semibold">
                  {item.title}
                </CardHeader>
                <CardContent className="text-3xl font-semibold">
                  {item.value}
                </CardContent>
                <CardFooter>{item.description}</CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
