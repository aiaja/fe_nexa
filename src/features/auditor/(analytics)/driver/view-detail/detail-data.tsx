"use client";

import { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DriverDetail } from "@/interface/auditor/driver";
import IncidentHistory from "./incident-history";
import RecentTrips from "./recent-trips";

interface DetailDataProps {
  driver: DriverDetail;
}

const riskLevelColors = {
  CRITICAL: "bg-red-600 text-white hover:bg-red-600",
  HIGH: "bg-orange-600 text-white hover:bg-orange-600",
  MEDIUM: "bg-yellow-600 text-white hover:bg-yellow-600",
  LOW: "bg-green-600 text-white hover:bg-green-600",
};

// Function to determine risk level from risk score
const getRiskLevel = (score: number): keyof typeof riskLevelColors => {
  if (score >= 75) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
};

export default function DetailData({ driver }: DetailDataProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("incident-history");
  const riskLevel = getRiskLevel(driver.riskScore);

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
              Driver Analysis: {driver.name}
            </h1>
            <p className="text-sm text-gray-500">
              Comprehensive driver performance and incident analysis
            </p>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Driver ID */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Driver ID</p>
                <p className="text-base font-bold text-gray-900">
                  {driver.driverId}
                </p>
              </div>
            </div>
          </Card>

          {/* Join Date */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Join Date</p>
                <p className="text-base font-bold text-gray-900">
                  {driver.joinDate}
                </p>
              </div>
            </div>
          </Card>

          {/* Risk Level */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Risk Level</p>
                <Badge className={riskLevelColors[riskLevel]}>
                  {riskLevel}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Risk Score */}
          <Card className="p-4 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Risk Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {driver.riskScore}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="p-6 border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Performance Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* On-Time Delivery */}
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <p className="text-sm text-gray-600">On-Time Delivery</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {driver.performanceMetrics.onTimeDelivery}%
              </p>
              <Progress
                value={driver.performanceMetrics.onTimeDelivery}
                className="h-2 mt-3 bg-green-200 [&>div]:bg-green-500"
              />
            </div>

            {/* Fuel Efficiency */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-sm text-gray-600">Fuel Efficiency</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {driver.performanceMetrics.fuelEfficiency}%
              </p>
              <Progress
                value={driver.performanceMetrics.fuelEfficiency}
                className="h-2 mt-3 bg-blue-200 [&>div]:bg-blue-500"
              />
            </div>

            {/* Safety Score */}
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <p className="text-sm text-gray-600">Safety Score</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {driver.performanceMetrics.safetyScore}%
              </p>
              <Progress
                value={driver.performanceMetrics.safetyScore}
                className="h-2 mt-3 bg-purple-200 [&>div]:bg-purple-500"
              />
            </div>

            {/* Compliance Rate */}
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
              <p className="text-sm text-gray-600">Compliance Rate</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {driver.performanceMetrics.complianceRate}%
              </p>
              <Progress
                value={driver.performanceMetrics.complianceRate}
                className="h-2 mt-3 bg-yellow-200 [&>div]:bg-yellow-500"
              />
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-white rounded-xl p-1">
            <TabsTrigger
              value="incident-history"
              className="rounded-lg data-[state=active]:bg-gray-200 data-[state=active]:text-black data-[state=active]:shadow-sm text-gray-600 transition"
            >
              Incident History
            </TabsTrigger>

            <TabsTrigger
              value="recent-trips"
              className="
      rounded-lg
      data-[state=active]:bg-gray-200
      data-[state=active]:text-black
      data-[state=active]:shadow-sm
      text-gray-600
      transition
    "
            >
              Recent Trips
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "incident-history" && (
            <IncidentHistory incidents={driver.incidentHistory} />
          )}
          {activeTab === "recent-trips" && (
            <RecentTrips trips={driver.recentTrips} />
          )}
        </div>
      </div>
    </div>
  );
}
