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
  reportItems: initialReportItems,
}: ReportTableProps) {
  const [reportItems, setReportItems] = useState<ReportTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportTable | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<ReportTable[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  useEffect(() => {
    loadReportsData();
  }, [initialReportItems]);

  const loadReportsData = () => {
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
          setReportItems(data);
        } else {
          // If data structure is wrong, use initialReportItems
          setReportItems(initialReportItems);
          saveToStorage(initialReportItems, []);
        }
      } else {
        setReportItems(initialReportItems);
        saveToStorage(initialReportItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setReportItems(initialReportItems);
      saveToStorage(initialReportItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedReports: ReportTable[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        reports: updatedReports,
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

  const activeReportItems = useMemo(() => {
    return reportItems;
  }, [reportItems]);

  const filteredData = useMemo(() => {
    let result = activeReportItems;

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
  }, [activeReportItems, searchQuery, filters]);

  const handleActionClick = (
    report: ReportTable,
    position: { top: number; left: number }
  ) => {
    setSelectedReport(report);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (report: ReportTable) => {
    setSelectedReport(report);
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
    <div className="flex flex-1 flex-col gap-4">
      <div className="text-md font-semibold">
        Table Report
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        onActionClick={handleActionClick}
        onSelectionChange={handleSelectionChange}
      />
      <ActionModal<ReportTable>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedReport}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/report"
      />
    </div>
  );
}
