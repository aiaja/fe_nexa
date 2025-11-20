"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { RefuelingLogbook } from "@/interface/manager/refueling-logbook";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface RefuelingLogbookProps {
  refuelingItems: RefuelingLogbook[];
}

const STORAGE_KEY = "refuelings-data";

export default function RefuelingLogbookPage({
  refuelingItems: initialRefuelingItems,
}: RefuelingLogbookProps) {
  const [refuelingItems, setRefuelingItems] = useState<RefuelingLogbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRefueling, setSelectedRefueling] = useState<RefuelingLogbook | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<RefuelingLogbook[]>([]);
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
      // Clear old admin refueling data from localStorage
      localStorage.removeItem("refuelings-data-admin");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: RefuelingLogbook[] = [];

        if (parsedData.refuelings && Array.isArray(parsedData.refuelings)) {
          data = parsedData.refuelings;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for RefuelingLogbook fields)
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
    updatedRefuelings: RefuelingLogbook[],
    updatedDeletedIds?: string[]
  ) => {
    try {
      const dataToSave = {
        refuelings: updatedRefuelings,
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
    return refuelingItems;
  }, [refuelingItems]);

  const filteredData = useMemo(() => {
    let result = activeRefuelingItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (refueling) =>
          refueling.id.toLowerCase().includes(query) ||
          refueling.name.toLowerCase().includes(query) ||
          refueling.location.toLowerCase().includes(query) ||
          refueling.fleet_id.toLowerCase().includes(query)
      );
    }
    return result;
  }, [activeRefuelingItems, searchQuery, filters]);

  const handleActionClick = (
    refueling: RefuelingLogbook,
    position: { top: number; left: number }
  ) => {
    setSelectedRefueling(refueling);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (refueling: RefuelingLogbook) => {
    setSelectedRefueling(refueling);
    setIsEditOpen(true);
  };

  const handleSelectionChange = (rows: RefuelingLogbook[]) => {
    setSelectedRows(rows);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading refuelings data...</p>
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

      <ActionModal<RefuelingLogbook>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedRefueling}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/manager/refueling"
      />
    </div>
  );
}
