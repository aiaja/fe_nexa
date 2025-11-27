"use client";

import { useState, useMemo } from "react";
import { Search, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { driverAnalyticsData } from "@/data/auditor/driver-analytics";
import { DriverAnalytics } from "@/interface/auditor/driveranalytics";
import { Pagination } from "./pagination";
import { RiskScoreBadge } from "./risk-score-badge";
import { RankMedal } from "./rank-medal";

export function DriverAnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskLevelFilter, setRiskLevelFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sortBy, setSortBy] = useState<"rank" | "incidents" | "riskScore">(
    "rank"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredDrivers = useMemo(() => {
    let result = driverAnalyticsData;

    // Search by driver ID or name
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (driver) =>
          driver.driverId.toLowerCase().includes(query) ||
          driver.name.toLowerCase().includes(query)
      );
    }

    // Filter by risk level
    if (riskLevelFilter !== "all") {
      result = result.filter((driver) => driver.riskLevel === riskLevelFilter);
    }

    return result;
  }, [searchQuery, riskLevelFilter]);

  const sortedFilteredDrivers = useMemo(() => {
    let result = [...filteredDrivers];

    result.sort((a, b) => {
      let aVal: number, bVal: number;

      switch (sortBy) {
        case "rank":
          aVal = a.rank;
          bVal = b.rank;
          break;
        case "incidents":
          aVal = a.incidents;
          bVal = b.incidents;
          break;
        case "riskScore":
          aVal = a.riskScore;
          bVal = b.riskScore;
          break;
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [filteredDrivers, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedFilteredDrivers.length / perPage);
  const paginatedDrivers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return sortedFilteredDrivers.slice(start, end);
  }, [sortedFilteredDrivers, currentPage, perPage]);

  const handleFilterChange = (value: string) => {
    setRiskLevelFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Driver Analysis</h1>
          <p className="text-gray-600">High-Risk Drivers</p>
          <p className="text-sm text-gray-500">
            Comprehensive driver behavior and incident analysis
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
              i
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">
              Risk Scoring Criteria
            </h3>
            <p className="text-sm text-blue-800">
              Critical (80-100), High (60-79), Medium (40-59), Low (0-39). Risk
              scores are calculated based on incident frequency, severity,
              compliance rate, and safety metrics.
            </p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search Driver"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 focus-visible:ring-0 focus-visible:border-blue-500"
            />
          </div>

          <select
            aria-label="Filter by risk level"
            value={riskLevelFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium focus-visible:outline-none focus-visible:border-blue-500 cursor-pointer hover:border-gray-400 transition-colors"
          >
            <option value="all">All Risk Levels</option>
            <option value="CRITICAL">Critical (80-100)</option>
            <option value="HIGH">High (60-79)</option>
            <option value="MEDIUM">Medium (40-59)</option>
            <option value="LOW">Low (0-39)</option>
          </select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600">
          Showing {paginatedDrivers.length} of {sortedFilteredDrivers.length}{" "}
          drivers
        </p>

        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          {paginatedDrivers.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => {
                          if (sortBy === "rank") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          } else {
                            setSortBy("rank");
                            setSortOrder("asc");
                          }
                        }}
                      >
                        RANK{" "}
                        {sortBy === "rank" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                        DRIVER ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                        NAME
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => {
                          if (sortBy === "incidents") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          } else {
                            setSortBy("incidents");
                            setSortOrder("desc");
                          }
                        }}
                      >
                        INCIDENTS{" "}
                        {sortBy === "incidents" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                        onClick={() => {
                          if (sortBy === "riskScore") {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          } else {
                            setSortBy("riskScore");
                            setSortOrder("desc");
                          }
                        }}
                      >
                        RISK SCORE{" "}
                        {sortBy === "riskScore" &&
                          (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDrivers.map((driver) => (
                      <DriverRow key={driver.driverId} driver={driver} />
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                perPage={perPage}
                onPerPageChange={(newPerPage) => {
                  setPerPage(newPerPage);
                  setCurrentPage(1);
                }}
              />
            </>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-gray-700 font-medium mb-1">
                No high-risk drivers found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DriverRow({ driver }: { driver: DriverAnalytics }) {
  const getIncidentColor = (incidents: number) => {
    if (incidents >= 5) return "bg-red-100 text-red-700";
    if (incidents >= 3) return "bg-orange-100 text-orange-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const isTopThree = driver.rank <= 3;
  const rowHighlightClass = isTopThree
    ? "bg-yellow-50 border-l-4 border-l-yellow-400 shadow-sm"
    : "hover:bg-gray-50";

  return (
    <tr
      className={`border-b border-gray-200 transition-colors ${rowHighlightClass}`}
    >
      <td className="px-6 py-4 text-sm">
        <RankMedal rank={driver.rank} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{driver.driverId}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {driver.name}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${getIncidentColor(
            driver.incidents
          )}`}
        >
          {driver.incidents}
        </span>
      </td>
      <td className="px-6 py-4">
        <RiskScoreBadge score={driver.riskScore} size="md" />
      </td>
      <td className="px-6 py-4">
        <Link
          href={`/auditor/driver/${driver.driverId}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          <Eye className="h-4 w-4" />
          View Detail
        </Link>
      </td>
    </tr>
  );
}
