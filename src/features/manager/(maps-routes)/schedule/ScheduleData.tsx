"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { ScheduleData } from "@/interface/manager/schedule";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface ScheduleDataProps {
  scheduleItems: ScheduleData[];
}

const STORAGE_KEY = "schedules-data";

export default function ScheduleDataPage({
  scheduleItems: initialScheduleItems,
}: ScheduleDataProps) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleData | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<ScheduleData[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
      types: [],
      statuses: [],
      yearRange: { min: "", max: "" }
    })

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
    let result = activeScheduleItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(schedule =>
        schedule.scheduleId.toLowerCase().includes(query) ||
        schedule.startPoint.toLowerCase().includes(query) ||
        schedule.endPoint.toLowerCase().includes(query) ||
        schedule.driverId?.toLowerCase().includes(query) ||
        schedule.driverName.toLowerCase().includes(query) ||
        schedule.fleetId.toLowerCase().includes(query) 
      )
    }

    return result
  }, [activeScheduleItems, searchQuery, filters])

  const handleActionClick = (
    schedule: ScheduleData,
    position: { top: number; left: number }
  ) => {
    setSelectedSchedule(schedule);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (schedule: ScheduleData) => {
    setSelectedSchedule(schedule);
    setIsEditOpen(true);
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
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search Schedule"
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

      <ActionModal<ScheduleData>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedSchedule}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/schedule"
      />
    </div>
  );
}
