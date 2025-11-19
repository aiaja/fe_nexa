"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { FleetManagement } from "@/interface/manager/fleet-management";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface FleetManagementProps {
  fleetItems: FleetManagement[];
}

const STORAGE_KEY = "fleets-data";

export default function FleetManagementPage({
  fleetItems: initialFleetItems,
}: FleetManagementProps) {
  const [fleetItems, setFleetItems] = useState<FleetManagement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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

  const handleEditClick = (fleet: FleetManagement) => {
    setSelectedFleet(fleet);
    setIsEditOpen(true);
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
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search Fleet"
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

      <ActionModal<FleetManagement>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedFleet}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/fleet"
      />
    </div>
  );
}
