"use client";

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
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { mockCheckpoints, getMockZones, getMockRoutes } from '@/data/map';


interface DashboardProps {
  overviewItems: DashboardOverview[];
  anomalyItems: DashboardAnomaly[];
}

const MapVisualizer = dynamic(
  () => import('@/components/Map'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading Map...
      </div>
    )
  }
);

function Dashboard({ overviewItems, anomalyItems }: DashboardProps) {
  const checkpoints = useMemo(() => mockCheckpoints, []);
  const zones = useMemo(() => getMockZones(checkpoints), [checkpoints]);
  const routes = useMemo(() => getMockRoutes(checkpoints), [checkpoints]);

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
        <Card className="gap-0 bg-slate-500">
          <MapVisualizer 
        zones={zones} 
        checkpoints={checkpoints} 
        routes={routes} 
      />
        </Card>
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
