"use client";

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CategoryType, SeverityType, ResolutionType, FilterOptions } from '@/interface/auditor/reports';

interface FilterControlsProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
}

export function FilterControls({ onFilterChange, onSearch }: FilterControlsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryChange = (category: CategoryType) => {
    const updated = {
      ...filters,
      category: filters.category?.includes(category)
        ? filters.category.filter(c => c !== category)
        : [...(filters.category || []), category],
    };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleSeverityChange = (severity: SeverityType) => {
    const updated = {
      ...filters,
      severity: filters.severity?.includes(severity)
        ? filters.severity.filter(s => s !== severity)
        : [...(filters.severity || []), severity],
    };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleResolutionChange = (resolution: ResolutionType) => {
    const updated = {
      ...filters,
      resolution: filters.resolution?.includes(resolution)
        ? filters.resolution.filter(r => r !== resolution)
        : [...(filters.resolution || []), resolution],
    };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex gap-3 items-center mb-6">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Case ID, Fleet, or Driver"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        <Filter className="w-5 h-5" />
        Filter by
      </button>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="absolute top-16 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 min-w-max">
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Category</label>
              <div className="space-y-2">
                {(['SUDDEN DROP', 'OUT OF ZONE', 'OVERCONSUMPTION', 'SENSOR MALFUNCTION'] as CategoryType[]).map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.category?.includes(cat) || false}
                      onChange={() => handleCategoryChange(cat)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Severity</label>
              <div className="space-y-2">
                {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as SeverityType[]).map(sev => (
                  <label key={sev} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.severity?.includes(sev) || false}
                      onChange={() => handleSeverityChange(sev)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">{sev}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resolution Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Resolution</label>
              <div className="space-y-2">
                {(['confirmed_theft', 'driver_behavior', 'fleet_issue', 'no_violation'] as ResolutionType[]).map(res => (
                  <label key={res} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.resolution?.includes(res) || false}
                      onChange={() => handleResolutionChange(res)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {res === 'confirmed_theft' && 'Confirmed Theft'}
                      {res === 'driver_behavior' && 'Driver Behavior'}
                      {res === 'fleet_issue' && 'Fleet Issue'}
                      {res === 'no_violation' && 'No Violation'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
