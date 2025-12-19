"use client";

import { CalendarWrapper } from "./CalendarWrapper";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, TableProperties } from "lucide-react";
import { MOCK_EVENTS } from "@/data/manager/schedule";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ScheduleData } from "@/interface/manager/schedule";

export default function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("calendar");
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

  // Convert CalendarEvent to ScheduleData for the table
  const scheduleItems = useMemo(
    () =>
      MOCK_EVENTS.map((event) => ({
        scheduleId: event.scheduleId,
        startTime: event.startTime,
        endTime: event.endTime,
        startPoint: event.startPoint,
        endPoint: event.endPoint,
        driverId: event.driverId,
        driverName: event.driverName,
        fleetId: event.fleetId,
      })),
    []
  );

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

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Delivery Schedule
          </h1>
        </div>
        <div className="flex justify-between">
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

          <div className="flex items-center gap-3">
            <div>Tampilan :</div>
            <Select
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "table" | "calendar")
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="calendar">
                  <div className="flex items-center gap-2">
                    <Grid3X3 className="size-4" />
                    Calendar
                  </div>
                </SelectItem>
                <SelectItem value="table">
                  <div className="flex items-center gap-2">
                    <TableProperties className="size-4" />
                    Table
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {viewMode === "calendar" ? (
          <CalendarWrapper />
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            onActionClick={handleActionClick}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </div>
    </div>
  );
}
