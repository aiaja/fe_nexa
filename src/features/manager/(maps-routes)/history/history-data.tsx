"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { DeliveryHistory } from "@/interface/manager/delivery-history";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface DeliveryHistoryProps {
  historyItems: DeliveryHistory[];
}

const STORAGE_KEY = "histories-data";

export default function DeliveryHistoryPage({
  historyItems: initialHistoryItems,
}: DeliveryHistoryProps) {
  const [historyItems, setHistoryItems] = useState<DeliveryHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<DeliveryHistory | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<DeliveryHistory[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  useEffect(() => {
    loadHistoriesData();
  }, [initialHistoryItems]);

  const loadHistoriesData = () => {
    setIsLoading(true);
    try {
      // Clear old admin history data from localStorage
      localStorage.removeItem("histories-data-admin");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: DeliveryHistory[] = [];

        if (parsedData.histories && Array.isArray(parsedData.histories)) {
          data = parsedData.histories;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for DeliveryHistory fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setHistoryItems(data);
        } else {
          // If data structure is wrong, use initialHistoryItems
          setHistoryItems(initialHistoryItems);
          saveToStorage(initialHistoryItems, []);
        }
      } else {
        setHistoryItems(initialHistoryItems);
        saveToStorage(initialHistoryItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setHistoryItems(initialHistoryItems);
      saveToStorage(initialHistoryItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedHistories: DeliveryHistory[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        histories: updatedHistories,
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

  const activeHistoryItems = useMemo(() => {
    return historyItems;
  }, [historyItems]);

  const filteredData = useMemo(() => {
    let result = activeHistoryItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (history) =>
          history.id.toLowerCase().includes(query) ||
          history.name.toLowerCase().includes(query) ||
          history.location.toLowerCase().includes(query) ||
          history.fleet_id.toLowerCase().includes(query)
      );
    }
    return result;
  }, [activeHistoryItems, searchQuery, filters]);

  const handleActionClick = (
    history: DeliveryHistory,
    position: { top: number; left: number }
  ) => {
    setSelectedHistory(history);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (history: DeliveryHistory) => {
    setSelectedHistory(history);
    setIsEditOpen(true);
  };

  const handleSelectionChange = (rows: DeliveryHistory[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading histories data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">History Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search History"
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

      <ActionModal<DeliveryHistory>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedHistory}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/history"
      />
    </div>
  );
}
