"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { DriverData } from "@/interface/admin/driver"
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface DriverDataProps {
  driverItems: DriverData[];
}

const STORAGE_KEY = "drivers-data";

export default function DriverDataPage({
  driverItems: initialDriverItems,
}: DriverDataProps) {
  const [driverItems, setDriverItems] = useState<DriverData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<DriverData | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<DriverData[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    licenses: [],
    statuses: [],
    assignmentStatus: 'all'
  });

  useEffect(() => {
    loadDriversData();
  }, [initialDriverItems]);

  const loadDriversData = () => {
    setIsLoading(true);
    try {
      // Clear old admin driver data from localStorage
      localStorage.removeItem("drivers-data-admin");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: DriverData[] = [];

        if (parsedData.drivers && Array.isArray(parsedData.drivers)) {
          data = parsedData.drivers;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for DriverData fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setDriverItems(data);
        } else {
          // If data structure is wrong, use initialDriverItems
          setDriverItems(initialDriverItems);
          saveToStorage(initialDriverItems, []);
        }
      } else {
        setDriverItems(initialDriverItems);
        saveToStorage(initialDriverItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setDriverItems(initialDriverItems);
      saveToStorage(initialDriverItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedDrivers: DriverData[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        drivers: updatedDrivers,
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

  const activeDriverItems = useMemo(() => {
    return driverItems;
  }, [driverItems]);

   const filteredData = useMemo(() => {
    let result = activeDriverItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(driver =>
        driver.id.toLowerCase().includes(query) ||
        driver.name.toLowerCase().includes(query) ||
        driver.licenseNumber.toLowerCase().includes(query) ||
        driver.phone.toLowerCase().includes(query)
      )
    }

    if (filters.licenses.length > 0) {
      result = result.filter(driver => filters.licenses.includes(driver.licenseType))
    }

    if (filters.statuses.length > 0) {
      result = result.filter(driver => filters.statuses.includes(driver.status))
    }

    if (filters.assignmentStatus === 'assigned') {
      result = result.filter(driver => driver.assignedTruck !== undefined)
    } else if (filters.assignmentStatus === 'unassigned') {
      result = result.filter(driver => driver.assignedTruck === undefined)
    }

    return result
  }, [activeDriverItems, searchQuery, filters])

  const handleActionClick = (
    driver: DriverData,
    position: { top: number; left: number }
  ) => {
    setSelectedDriver(driver);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (driver: DriverData) => {
    setSelectedDriver(driver);
    setIsEditOpen(true);
  };

  const handleSelectionChange = (rows: DriverData[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading drivers data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search Driver"
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

      <ActionModal<DriverData>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedDriver}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/driver"
      />
    </div>
  );
}
