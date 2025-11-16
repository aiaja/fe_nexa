"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { ReportCard } from "@/features/auditor/incidents/report-card";
import { ReportTable } from "@/features/auditor/incidents/report-table";
import { ViewToggle } from "@/features/auditor/incidents/view-toggle";
import { Pagination } from "@/features/auditor/incidents/pagination";
import { IncidentReport } from "@/interface/auditor/incident-reports/incidents";

interface IncidentReportsProps {
  incidents: IncidentReport[];
}

export default function IncidentReports({ incidents }: IncidentReportsProps) {
  const [view, setView] = useState<"card" | "table">("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter incidents based on search
  const filteredIncidents = useMemo(() => {
    if (!searchQuery) return incidents;

    const query = searchQuery.toLowerCase();
    return incidents.filter(
      (incident) =>
        incident.title.toLowerCase().includes(query) ||
        incident.vehicleName.toLowerCase().includes(query) ||
        incident.driver.name.toLowerCase().includes(query) ||
        incident.fleet.id.toLowerCase().includes(query) ||
        incident.id.toLowerCase().includes(query)
    );
  }, [searchQuery, incidents]);

  // Pagination
  const totalPages = Math.ceil(filteredIncidents.length / perPage);
  const paginatedIncidents = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return filteredIncidents.slice(start, end);
  }, [filteredIncidents, currentPage, perPage]);

  const handleInvestigate = (id: string) => {
    console.log("Investigate incident:", id);
    // Navigate to investigation page
    window.location.href = `/auditor/incident/${id}/investigation`;
  };

  const handleQuickConfirm = (id: string) => {
    console.log("Quick confirm:", id);
    
    // Add your confirmation logic here
    window.location.href = `/auditor/incidents/${id}/resolve`;
  };

  const handleDismiss = (id: string) => {
    console.log("Dismiss:", id);
    // Add your dismiss logic here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Incident Reports
            </h1>
            <p className="text-sm text-gray-500">
              Manage and review all investigation cases
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by vehicle, license plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <ViewToggle view={view} onViewChange={setView} />
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {paginatedIncidents.length} of {filteredIncidents.length}{" "}
            incidents
          </div>

          {/* Content */}
          {view === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedIncidents.map((incident) => (
                <ReportCard
                  key={incident.id}
                  incident={incident}
                  onInvestigate={handleInvestigate}
                  onQuickConfirm={handleQuickConfirm}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          ) : (
            <ReportTable
              incidents={paginatedIncidents}
              onInvestigate={handleInvestigate}
            />
          )}

          {/* Pagination */}
          {filteredIncidents.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              perPage={perPage}
              onPerPageChange={handlePerPageChange}
            />
          )}

          {/* Empty State */}
          {filteredIncidents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No incidents found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
