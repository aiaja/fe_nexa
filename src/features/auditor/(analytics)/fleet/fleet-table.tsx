'use client'

import React from 'react'
import { ChevronUp, ChevronDown, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FleetStatusBadge from './fleet-status-badge'
import IssuesBadge from './issues-badge'

interface FleetData {
  id: string
  fleetId: string
  make: string
  model: string
  issues: number
  status: 'Normal' | 'Monitoring' | 'Under Watch' | 'Maintenance'
  lastIncident?: string
}

interface FleetTableProps {
  data: FleetData[]
  sortConfig: { key: keyof FleetData; direction: 'asc' | 'desc' }
  onSort: (key: keyof FleetData) => void
}

export default function FleetTable({ data, sortConfig, onSort }: FleetTableProps) {
  const SortIcon = ({ column }: { column: keyof FleetData }) => {
    if (sortConfig.key !== column) {
      return <div className="w-4 h-4" />
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    )
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-3 text-left">
              <button
                onClick={() => onSort('fleetId')}
                className="flex items-center gap-2 font-semibold text-slate-900 hover:text-blue-600 cursor-pointer"
              >
                Fleet ID
                <SortIcon column="fleetId" />
              </button>
            </th>
            <th className="px-6 py-3 text-left">
              <button
                onClick={() => onSort('make')}
                className="flex items-center gap-2 font-semibold text-slate-900 hover:text-blue-600 cursor-pointer"
              >
                Make
                <SortIcon column="make" />
              </button>
            </th>
            <th className="px-6 py-3 text-left">
              <button
                onClick={() => onSort('issues')}
                className="flex items-center gap-2 font-semibold text-slate-900 hover:text-blue-600 cursor-pointer"
              >
                Issues
                <SortIcon column="issues" />
              </button>
            </th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Status</th>
            <th className="px-6 py-3 text-left font-semibold text-slate-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fleet, idx) => (
            <tr
              key={fleet.id}
              className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                sortConfig.key === 'issues' && sortConfig.direction === 'desc' && idx < 3
                  ? 'bg-yellow-50'
                  : ''
              }`}
            >
              <td className="px-6 py-4 font-semibold text-slate-900">{fleet.fleetId}</td>
              <td className="px-6 py-4 text-slate-700">
                {fleet.make} {fleet.model}
              </td>
              <td className="px-6 py-4">
                <IssuesBadge count={fleet.issues} />
              </td>
              <td className="px-6 py-4">
                <FleetStatusBadge status={fleet.status} />
              </td>
              <td className="px-6 py-4">
                <Link href={`/auditor/fleet/${fleet.id}`}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 gap-2">
                    <Eye className="w-4 h-4" />
                    View Detail
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
