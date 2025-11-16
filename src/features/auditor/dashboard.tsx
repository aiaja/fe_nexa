"use client";

import React from "react";

import { AlertTriangle, Truck, User2, LucideIcon } from "lucide-react";

import {
  DashboardOverview,
  AnomalyDetection,
  FleetTotal,
  RecentIncidents,
} from "@/interface/auditor/dashboard";

import { AuditorCard } from "@/features/auditor/dashboard/auditor-card";
import { AnomalyDetectionChart } from "@/features/auditor/dashboard/anomaly-chart";
import { FleetTotalChart } from "@/features/auditor/dashboard/fleet-totals-chart";
import { Incidents } from "@/features/auditor/dashboard/recent-incident";

interface AuditorDashboardProps {
  card: DashboardOverview[];
  anomaly: AnomalyDetection[];
  fleet: FleetTotal[];
  incident: RecentIncidents[];
}

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Truck,
  User2,
};

export default function AuditorDashboard({
  card,
  anomaly,
  fleet,
  incident,
}: AuditorDashboardProps) {
  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome Auditor !
            </h1>
            <p className="text-sm text-gray-500">
              DieselTrack Fuel Monitoring System - Real-time Monitoring &
              Investigation
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {card.map((item, index) => {
              // FIX: gunakan fallback untuk mencegah undefined
              const Icon = iconMap[item.icon] ?? AlertTriangle;

              return (
                <AuditorCard
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  value={item.value}
                  icon={Icon}
                  color={item.color}
                  linkText="View Detail"
                />
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <AnomalyDetectionChart data={anomaly} />
            <FleetTotalChart data={fleet} />
          </div>

          {/* Incidents */}
          <p className="text-lg font-bold text-gray-900">
            Recent Incident
          </p>
          <Incidents data={incident} />
        </div>
      </div>
    </div>
  );
}
