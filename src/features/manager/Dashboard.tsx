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
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useState, useMemo, useEffect } from "react";
import { mockCheckpoints, getMockZones, getMockRoutes } from "@/data/map";
import { DataTable } from "@/components/data-table";
import { columns } from "./(maps-routes)/schedule/columns";
import { ScheduleData } from "@/interface/manager/schedule";
import { FilterValues } from "./(maps-routes)/schedule/filter-popover";

interface DashboardProps {
  overviewItems: DashboardOverview[];
  anomalyItems: DashboardAnomaly[];
  scheduleItems: ScheduleData[];
}

const MapVisualizer = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div
    className="flex justify-center items-center h-100vh text-lg"
    >
      Loading Map...
    </div>
  ),
});

const STORAGE_KEY = "schedules-data";

function Dashboard({
  overviewItems,
  anomalyItems,
  scheduleItems : initialScheduleItems
}: DashboardProps) {
  const checkpoints = useMemo(() => mockCheckpoints, []);
  const zones = useMemo(() => getMockZones(checkpoints), [checkpoints]);
  const routes = useMemo(() => getMockRoutes(checkpoints), [checkpoints]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleData | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<ScheduleData[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
      types: [],
      statuses: [],
      yearRange: { min: "", max: "" },
    });

  useEffect(() => {
    loadSchedulesData();
  }, [initialScheduleItems]);

  const loadSchedulesData = () => {
    setIsLoading(true);
    try {
      // Clear old admin schedule data from localStorage
      localStorage.removeItem("schedules-data-admin");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: ScheduleData[] = [];

        if (parsedData.schedules && Array.isArray(parsedData.schedules)) {
          data = parsedData.schedules;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for ScheduleData fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setScheduleItems(data);
        } else {
          // If data structure is wrong, use initialScheduleItems
          setScheduleItems(initialScheduleItems);
          saveToStorage(initialScheduleItems, []);
        }
      } else {
        setScheduleItems(initialScheduleItems);
        saveToStorage(initialScheduleItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setScheduleItems(initialScheduleItems);
      saveToStorage(initialScheduleItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedSchedules: ScheduleData[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        schedules: updatedSchedules,
        deletedIds: updatedDeletedIds !== undefined ? updatedDeletedIds : "",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save to storage:", error);
      toast.error("Failed to save data", {
        description: "Your changes may not persist after refresh",
      });
    }
  };

  

  const activeScheduleItems = useMemo(() => {
    return scheduleItems;
  }, [scheduleItems]);

  const filteredData = useMemo(() => {
    let result = activeScheduleItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (schedule) =>
          schedule.scheduleId.toLowerCase().includes(query) ||
          schedule.startPoint.toLowerCase().includes(query) ||
          schedule.endPoint.toLowerCase().includes(query) ||
          schedule.driverId?.toLowerCase().includes(query) ||
          schedule.driverName.toLowerCase().includes(query) ||
          schedule.fleetId.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeScheduleItems, searchQuery, filters]);

  const handleActionClick = (
    schedule: ScheduleData,
    position: { top: number; left: number }
  ) => {
    setSelectedSchedule(schedule);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleSelectionChange = (rows: ScheduleData[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading schedules data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold leading-8">
        Schedule Data Overview
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
          <MapVisualizer
            zones={zones}
            checkpoints={checkpoints}
            routes={routes}
          />
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
      <div className="text-xl font-semibold leading-8">Schedule Status Table</div>
      <DataTable
        columns={columns}
        data={filteredData}
        onActionClick={handleActionClick}
        onSelectionChange={handleSelectionChange}
        pageSize={5}
      />
    </div>
  );
}

export default Dashboard;
