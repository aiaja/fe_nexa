"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Truck,
  Calendar,
  Activity,
  AlertTriangle,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FleetDetail } from "@/interface/auditor/fleet";
import RouteTracking from "./route-tracking";
import Refueling from "./refueling";
import Incident from "./incident";

interface DetailDataProps {
  fleet: FleetDetail;
}

const statusColors = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-red-100 text-red-700",
  "UNDER WATCH": "bg-orange-100 text-orange-700",
  MONITORING: "bg-yellow-100 text-yellow-700",
};

export default function DetailData({ fleet }: DetailDataProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("route-tracking");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Back Button & Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-10 w-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Fleet Analysis: {fleet.fleetId} - {fleet.model}
            </h1>
            <p className="text-sm text-gray-500">
              Comprehensive fleet health and maintenance analysis
            </p>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Fleet ID */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Truck className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fleet ID</p>
                <p className="text-base font-bold text-gray-900">
                  {fleet.fleetId}
                </p>
              </div>
            </div>
          </Card>

          {/* Model Year */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Model Year</p>
                <p className="text-base font-bold text-gray-900">
                  {fleet.modelYear}
                </p>
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <Badge
                  variant="secondary"
                  className={statusColors[fleet.status]}
                >
                  {fleet.status}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Risk Score */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Risk Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {fleet.riskScore}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Driver Info Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-blue-700 font-medium">
                Currently Assigned Driver
              </p>
              <p className="text-base font-bold text-blue-900">
                {fleet.currentDriver.name} ({fleet.currentDriver.id})
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-white">
            <TabsTrigger value="route-tracking">Route Tracking</TabsTrigger>
            <TabsTrigger value="refueling">Refueling History</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <Card className="p-12 text-center border-gray-200">
              <p className="text-lg font-medium text-gray-500">Overview Tab</p>
              <p className="text-sm text-gray-400 mt-2">Content coming soon</p>
            </Card>
          )}
          {activeTab === "route-tracking" && (
            <RouteTracking routes={fleet.routeHistory} />
          )}
          {activeTab === "refueling" && (
            <Refueling records={fleet.refuelingHistory} />
          )}
          {activeTab === "incidents" && (
            <Incident incidents={fleet.incidents} />
          )}
        </div>
      </div>
    </div>
  );
}
