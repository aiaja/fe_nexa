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
import { columns } from "@/features/manager/(fleet-driver)/fleet/columns";
import type { FleetManagement } from "@/interface/manager/fleet-management";
import { FilterValues } from "@/features/manager/(fleet-driver)/fleet/filter-popover";

interface DashboardProps {
  overviewItems: DashboardOverview[];
  anomalyItems: DashboardAnomaly[];
  fleetItems: FleetManagement[];
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

const STORAGE_KEY = "fleets-data";

function Dashboard({
  overviewItems,
  anomalyItems,
  fleetItems: initialFleetItems,
}: DashboardProps) {
  const checkpoints = useMemo(() => mockCheckpoints, []);
  const zones = useMemo(() => getMockZones(checkpoints), [checkpoints]);
  const routes = useMemo(() => getMockRoutes(checkpoints), [checkpoints]);
  const [fleetItems, setFleetItems] = useState<FleetManagement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<FleetManagement | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<FleetManagement[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  useEffect(() => {
    loadFleetsData();
  }, [initialFleetItems]);

  const loadFleetsData = () => {
    setIsLoading(true);
    try {
      // Clear old admin fleet data from localStorage
      localStorage.removeItem("fleets-data-admin");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: FleetManagement[] = [];

        if (parsedData.fleets && Array.isArray(parsedData.fleets)) {
          data = parsedData.fleets;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for FleetManagement fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setFleetItems(data);
        } else {
          // If data structure is wrong, use initialFleetItems
          setFleetItems(initialFleetItems);
          saveToStorage(initialFleetItems, []);
        }
      } else {
        setFleetItems(initialFleetItems);
        saveToStorage(initialFleetItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setFleetItems(initialFleetItems);
      saveToStorage(initialFleetItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedFleets: FleetManagement[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        fleets: updatedFleets,
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

  const activeFleetItems = useMemo(() => {
    return fleetItems;
  }, [fleetItems]);

  const filteredData = useMemo(() => {
    let result = activeFleetItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (fleet) =>
          fleet.id.toLowerCase().includes(query) ||
          fleet.location.toLowerCase().includes(query)
      );
    }

    if (filters.statuses.length > 0) {
      result = result.filter((fleet) =>
        filters.statuses.includes(fleet.status)
      );
    }

    return result;
  }, [activeFleetItems, searchQuery, filters]);

  const handleActionClick = (
    fleet: FleetManagement,
    position: { top: number; left: number }
  ) => {
    setSelectedFleet(fleet);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleSelectionChange = (rows: FleetManagement[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading fleets data...</p>
      </div>
    );
  }

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
      <div className="text-xl font-semibold leading-8">Fleet Status Table</div>
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
