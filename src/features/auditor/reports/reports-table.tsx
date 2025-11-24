"use client";

import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { ReportCase } from '@/interface/auditor/reports';
import { CategoryBadge } from './category-badge';
import { SeverityBadge } from './severity-badge';
import { ResolutionBadge } from './resolution-badge';

interface ReportsTableProps {
  cases: ReportCase[];
  selectedIds: string[];
  onSelectAll: (selected: boolean) => void;
  onSelectCase: (id: string, selected: boolean) => void;
  onEdit: (caseData: ReportCase) => void;
  onSort: (field: string) => void;
  sortField?: string;
}

export function ReportsTable({
  cases,
  selectedIds,
  onSelectAll,
  onSelectCase,
  onEdit,
  onSort,
  sortField,
}: ReportsTableProps) {
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  const truncateNotes = (notes: string, maxLength: number = 50) => {
    return notes.length > maxLength ? notes.slice(0, maxLength) + '...' : notes;
  };

  if (cases.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No reports found. Try adjusting your filters.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-2"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedIds.length === cases.length && cases.length > 0}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded"
                aria-label="Select all cases"

              />
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('caseId')}
            >
              Case ID {sortField === 'caseId' && '↓'}
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('dateTime')}
            >
              Date & Time {sortField === 'dateTime' && '↓'}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Fleet / Driver
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Severity
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Resolution
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Notes
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cases.map((caseItem) => (
            <tr key={caseItem.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(caseItem.id)}
                  onChange={(e) => onSelectCase(caseItem.id, e.target.checked)}
                  className="rounded"
                  aria-label="Select all cases"
                />
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{caseItem.caseId}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{caseItem.dateTime}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <div>{caseItem.fleetId}</div>
                <div className="text-gray-500">{caseItem.driverName}</div>
              </td>
              <td className="px-4 py-3">
                <CategoryBadge category={caseItem.category} />
              </td>
              <td className="px-4 py-3">
                <SeverityBadge severity={caseItem.severity} />
              </td>
              <td className="px-4 py-3">
                <ResolutionBadge resolution={caseItem.resolution} />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <div
                  className="relative group cursor-help"
                  onMouseEnter={() => setExpandedNotes(caseItem.id)}
                  onMouseLeave={() => setExpandedNotes(null)}
                >
                  {truncateNotes(caseItem.notes)}
                  {expandedNotes === caseItem.id && caseItem.notes.length > 50 && (
                    <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded whitespace-normal max-w-xs z-10">
                      {caseItem.notes}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEdit(caseItem)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
