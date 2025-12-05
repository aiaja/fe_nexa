"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { IncidentReport } from "@/interface/auditor/incident-reports/incidents";
import { FilterPopover, FilterValues } from "./filter-popover";
import { ActionModal } from "@/components/action-modal";

interface IncidentReportProps {
  incidentItems: IncidentReport[];
}

const STORAGE_KEY = "incident-data";

export default function IncidentReportPage({
  incidentItems: initialIncidentItems,
}: IncidentReportProps) {
  const [incidentItems, setIncidentItems] = useState<IncidentReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] =
    useState<IncidentReport | null>(null);
  const [selectedRows, setSelectedRows] = useState<IncidentReport[]>([]);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  useEffect(() => {
    loadFleetsData();
  }, [initialIncidentItems]);

  const loadFleetsData = () => {
    setIsLoading(true);
    try {
      // Clear old admin fleet data from localStorage
      localStorage.removeItem("incident-data");

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        let data: IncidentReport[] = [];

        if (parsedData.fleets && Array.isArray(parsedData.fleets)) {
          data = parsedData.fleets;
        } else if (Array.isArray(parsedData)) {
          data = parsedData;
        }

        // Validate data has correct structure (check for IncidentReport fields)
        if (data.length > 0 && data[0].hasOwnProperty("fuel_consumption")) {
          setIncidentItems(data);
        } else {
          // If data structure is wrong, use initialIncidentItems
          setIncidentItems(initialIncidentItems);
          saveToStorage(initialIncidentItems, []);
        }
      } else {
        setIncidentItems(initialIncidentItems);
        saveToStorage(initialIncidentItems, []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setIncidentItems(initialIncidentItems);
      saveToStorage(initialIncidentItems, []);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (
    updatedFleets: IncidentReport[],
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

  const activeIncidentItems = useMemo(() => {
    return incidentItems;
  }, [incidentItems]);

  const filteredData = useMemo(() => {
    let result = activeIncidentItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (caseNumber) =>
          caseNumber.id.toLowerCase().includes(query) ||
          caseNumber.caseNumber.toLowerCase().includes(query) ||    
          caseNumber.fleet?.fleetId?.toLowerCase().includes(query) ||
          caseNumber.title.toLowerCase().includes(query) ||
          caseNumber.driver?.name?.toLowerCase().includes(query) ||
          caseNumber.severity.toLowerCase().includes(query) 
        );
    }

    if (filters.statuses.length > 0) {
      result = result.filter((Incident) =>
        filters.statuses.includes(Incident.severity)
      );
    }

    return result;
  }, [activeIncidentItems, searchQuery, filters]);

  const handleActionClick = (
    fleet: IncidentReport,
    position: { top: number; left: number }
  ) => {
    setSelectedIncident(fleet);
    setActionPosition(position);
    setIsActionOpen(true);
  };

  const handleEditClick = (incident: IncidentReport) => {
    setSelectedIncident(incident);
    setIsEditOpen(true);
  };

  const handleSelectionChange = (rows: IncidentReport[]) => {
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

      <ActionModal<IncidentReport>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedIncident}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/auditor/incident"
      />
    </div>
  );
}
