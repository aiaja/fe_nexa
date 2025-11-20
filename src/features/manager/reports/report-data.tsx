"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { ReportTable } from "@/interface/manager/reports";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface ReportTableProps {
  reportItems: ReportTable[];
}

const STORAGE_KEY = "reports-data";

export default function ReportTablePage({
  reportItems: initialRefuelingItems,
}: ReportTableProps) {
  const [reportItems, setRefuelingItems] = useState<ReportTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRefueling, setSelectedRefueling] = useState<ReportTable | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<ReportTable[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  useEffect(() => {
    loadRefuelingsData();
  }, [initialRefuelingItems]);

  const loadRefuelingsData = () => {
    setIsLoading(true);
    try {
      // Clear old admin report data from localStorage
      localStorage.removeItem("reports-data-admin");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: ReportTable[] = [];

        if (parsedData.reports && Array.isArray(parsedData.reports)) {
          data = parsedData.reports;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for ReportTable fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setRefuelingItems(data);
        } else {
          // If data structure is wrong, use initialRefuelingItems
          setRefuelingItems(initialRefuelingItems);
          saveToStorage(initialRefuelingItems, []);
        }
      } else {
        setRefuelingItems(initialRefuelingItems);
        saveToStorage(initialRefuelingItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setRefuelingItems(initialRefuelingItems);
      saveToStorage(initialRefuelingItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedRefuelings: ReportTable[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        reports: updatedRefuelings,
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

  const activeRefuelingItems = useMemo(() => {
    return reportItems;
  }, [reportItems]);

  const filteredData = useMemo(() => {
    let result = activeRefuelingItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (report) =>
          report.id.toLowerCase().includes(query) ||
          report.driver_id.toLowerCase().includes(query) ||
          report.fleet_id.toLowerCase().includes(query) ||
          report.name.toLowerCase().includes(query) 
      );
    }
    return result;
  }, [activeRefuelingItems, searchQuery, filters]);

  const handleActionClick = (
    report: ReportTable,
    position: { top: number; left: number }
  ) => {
    setSelectedRefueling(report);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (report: ReportTable) => {
    setSelectedRefueling(report);
    setIsEditOpen(true);
  };

  const handleSelectionChange = (rows: ReportTable[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading reports data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Refueling Logbook</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search Refueling"
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

      <ActionModal<ReportTable>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedRefueling}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/report"
      />
    </div>
  );
}
