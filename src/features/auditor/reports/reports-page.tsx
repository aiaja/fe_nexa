"use client";

import React, { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import { ReportCase, FilterOptions, ResolutionType } from '@/interface/auditor/reports';
import { FilterControls } from './filter-controls';
import { ReportsTable } from './reports-table';
import { Pagination } from './pagination';
import { useRouter } from 'next/navigation';

interface ReportsPageProps {
  initialCases: ReportCase[];
}

export function ReportsPage({ initialCases }: ReportsPageProps) {
  const router = useRouter();
  const [cases, setCases] = useState<ReportCase[]>(initialCases);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortField, setSortField] = useState<string | undefined>();

  // Filter and search cases
  const filteredCases = useMemo(() => {
    let result = cases;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.caseId.toLowerCase().includes(query) ||
          c.fleetId.toLowerCase().includes(query) ||
          c.driverName.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      result = result.filter(c => filters.category!.includes(c.category));
    }

    // Severity filter
    if (filters.severity && filters.severity.length > 0) {
      result = result.filter(c => filters.severity!.includes(c.severity));
    }

    // Resolution filter
    if (filters.resolution && filters.resolution.length > 0) {
      result = result.filter(c => filters.resolution!.includes(c.resolution));
    }

    // Sorting
    if (sortField === 'caseId') {
      result = [...result].sort((a, b) => a.caseId.localeCompare(b.caseId));
    } else if (sortField === 'dateTime') {
      result = [...result].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
    }

    return result;
  }, [cases, filters, searchQuery, sortField]);

  // Pagination
  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(start, start + itemsPerPage);
  }, [filteredCases, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  // Handle select all
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(paginatedCases.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle select case
  const handleSelectCase = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  // Handle export
  const handleExport = () => {
    const casesToExport = selectedIds.length > 0
      ? cases.filter(c => selectedIds.includes(c.id))
      : filteredCases;

    const csvContent = [
      ['Case ID', 'Date & Time', 'Fleet ID', 'Driver Name', 'Category', 'Severity', 'Resolution', 'Notes'],
      ...casesToExport.map(c => [
        c.caseId,
        c.dateTime,
        c.fleetId,
        c.driverName,
        c.category,
        c.severity,
        c.resolution.replace('_', ' ').toUpperCase(),
        c.notes,
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NEXA_Audit_Reports_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle save case
  const handleSaveCase = (caseId: string, resolution: ResolutionType, notes: string) => {
    setCases(cases.map(c =>
      c.id === caseId ? { ...c, resolution, notes } : c
    ));
    // Show toast success message
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Detailed Case Report</h1>
        <p className="text-gray-600">Complete list of all cases with details</p>
      </div>

      {/* Filter Controls */}
      <FilterControls
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        {selectedIds.length > 0 && (
          <p className="text-sm text-gray-600">
            {selectedIds.length} case{selectedIds.length !== 1 ? 's' : ''} selected
          </p>
        )}
        {filteredCases.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Download className="w-4 h-4" />
            Export {selectedIds.length > 0 ? 'Selected' : 'All'}
          </button>
        )}
      </div>

      {/* Table */}
      <ReportsTable
        cases={paginatedCases}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectCase={handleSelectCase}
        onEdit={(caseData) => {
          router.push(`/auditor/reports/${caseData.id}/resolve`);
        }}
        onSort={(field) => {
          setSortField(sortField === field ? undefined : field);
        }}
        sortField={sortField}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
