"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { DriverAnalytics } from "@/interface/auditor/driver";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface DriverAnalyticsProps {
  DriverAnalyticsItems: DriverAnalytics[];
}

const STORAGE_KEY = "driver-analytics-data";

export default function DriverAnalyticsPage({
  DriverAnalyticsItems: initialDriverAnalyticsItems,
}: DriverAnalyticsProps) {
  const [DriverAnalyticsItems, setDriverAnalyticsItems] = useState<DriverAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] =
    useState<DriverAnalytics | null>(null);
  const [selectedRows, setSelectedRows] = useState<DriverAnalytics[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  useEffect(() => {
    loadFleetsData();
  }, [initialDriverAnalyticsItems]);

  const loadFleetsData = () => {
    setIsLoading(true);
    try {
      // Clear old admin fleet data from localStorage
      localStorage.removeItem("driver-analytics-data");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: DriverAnalytics[] = [];

        if (parsedData.fleets && Array.isArray(parsedData.fleets)) {
          data = parsedData.fleets;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for DriverAnalytics fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setDriverAnalyticsItems(data);
        } else {
          // If data structure is wrong, use initialDriverAnalyticsItems
          setDriverAnalyticsItems(initialDriverAnalyticsItems);
          saveToStorage(initialDriverAnalyticsItems, []);
        }
      } else {
        setDriverAnalyticsItems(initialDriverAnalyticsItems);
        saveToStorage(initialDriverAnalyticsItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setDriverAnalyticsItems(initialDriverAnalyticsItems);
      saveToStorage(initialDriverAnalyticsItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedFleets: DriverAnalytics[],
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

  const activeDriverAnalyticsItems = useMemo(() => {
    return DriverAnalyticsItems;
  }, [DriverAnalyticsItems]);

  const filteredData = useMemo(() => {
    let result = activeDriverAnalyticsItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (caseNumber) =>
          caseNumber.name.toLowerCase().includes(query) ||
          caseNumber.driverId.toLowerCase().includes(query)
      );
    }

    if (filters.statuses.length > 0) {
      result = result.filter((DriverAnalytics) =>
        filters.statuses.includes(DriverAnalytics.riskLevel)
      );
    }

    return result;
  }, [activeDriverAnalyticsItems, searchQuery, filters]);

  const handleActionClick = (
    fleet: DriverAnalytics,
    position: { top: number; left: number }
  ) => {
    setSelectedIncident(fleet);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (incident: DriverAnalytics) => {
    setSelectedIncident(incident);
    setIsEditOpen(true);
  };

  const handleSelectionChange = (rows: DriverAnalytics[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading incident data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-base text-gray-600 mt-1">
            Manage and review all investigation cases
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search Incident"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus-visible:ring-0 focus-visible:border-[#0047AB]"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <FilterPopover onApply={setFilters} currentFilters={filters} />
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          onActionClick={handleActionClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <ActionModal<DriverAnalytics>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedIncident}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/auditor/driver"
      />
    </div>
  );
}
