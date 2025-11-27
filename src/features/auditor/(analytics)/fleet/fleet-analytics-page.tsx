'use client'

import React, { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FleetTable from './fleet-table'
import Pagination from './pagination'

const MOCK_FLEET_DATA = [
  { id: '1', fleetId: 'TRK-039', make: 'Volvo', model: 'FH16', issues: 12, status: 'Under Watch' as const, lastIncident: '2025-01-15' },
  { id: '2', fleetId: 'TRK-003', make: 'Mercedes', model: 'Actros', issues: 8, status: 'Under Watch' as const, lastIncident: '2025-01-14' },
  { id: '3', fleetId: 'TRK-010', make: 'Mercedes', model: 'Actros', issues: 3, status: 'Monitoring' as const, lastIncident: '2025-01-10' },
  { id: '4', fleetId: 'TRK-038', make: 'CAT', model: '336L', issues: 6, status: 'Maintenance' as const, lastIncident: '2025-01-12' },
  { id: '5', fleetId: 'TRK-019', make: 'Volvo', model: 'FH16', issues: 9, status: 'Monitoring' as const, lastIncident: '2025-01-11' },
  { id: '6', fleetId: 'TRK-042', make: 'Scania', model: 'R440', issues: 2, status: 'Normal' as const, lastIncident: '2025-01-09' },
  { id: '7', fleetId: 'TRK-015', make: 'Volvo', model: 'FH12', issues: 14, status: 'Under Watch' as const, lastIncident: '2025-01-16' },
  { id: '8', fleetId: 'TRK-027', make: 'Mercedes', model: 'Sprinter', issues: 5, status: 'Monitoring' as const, lastIncident: '2025-01-08' },
  { id: '9', fleetId: 'TRK-041', make: 'MAN', model: 'TGX', issues: 11, status: 'Under Watch' as const, lastIncident: '2025-01-13' },
  { id: '10', fleetId: 'TRK-005', make: 'Iveco', model: 'Stralis', issues: 7, status: 'Monitoring' as const, lastIncident: '2025-01-07' },
  { id: '11', fleetId: 'TRK-022', make: 'Renault', model: 'Premium', issues: 1, status: 'Normal' as const, lastIncident: '2025-01-06' },
  { id: '12', fleetId: 'TRK-033', make: 'DAF', model: 'XF', issues: 13, status: 'Under Watch' as const, lastIncident: '2025-01-14' },
  { id: '13', fleetId: 'TRK-044', make: 'Hino', model: 'GH', issues: 4, status: 'Maintenance' as const, lastIncident: '2025-01-11' },
  { id: '14', fleetId: 'TRK-011', make: 'Nissan', model: 'UD', issues: 10, status: 'Under Watch' as const, lastIncident: '2025-01-15' },
  { id: '15', fleetId: 'TRK-028', make: 'Fuso', model: 'Fighter', issues: 6, status: 'Monitoring' as const, lastIncident: '2025-01-09' },
]

const STATUS_FILTER_OPTIONS = ['All Status', 'Under Watch', 'Monitoring', 'Maintenance', 'Normal']

export default function FleetAnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof MOCK_FLEET_DATA[0]; direction: 'asc' | 'desc' }>({
    key: 'issues',
    direction: 'desc',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  const filteredData = useMemo(() => {
    let result = MOCK_FLEET_DATA

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (fleet) => fleet.fleetId.toLowerCase().includes(query) || fleet.make.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (statusFilter !== 'All Status') {
      result = result.filter((fleet) => fleet.status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

    return result
  }, [searchQuery, statusFilter, sortConfig])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredData.slice(start, end)
  }, [filteredData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleSort = (key: keyof typeof MOCK_FLEET_DATA[0]) => {
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })
    } else {
      setSortConfig({ key, direction: 'desc' })
    }
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  return (
    <div className="w-full space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Fleet Analysis</h1>
        <p className="text-sm text-slate-600">High-Risk Fleet Vehicles</p>
        <p className="text-sm text-slate-500">
          Monitor and manage fleet vehicles with potential risks. Click on any vehicle to view detailed analytics and incident history.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Risk Criteria:</strong> Issues Count - <span className="text-red-600">High (≥10)</span>, <span className="text-orange-600">Medium (5-9)</span>, <span className="text-yellow-600">Low (1-4)</span>
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search Fleet"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative group">
          <Button variant="outline" className="gap-2">
            Filter by
            <ChevronDown className="w-4 h-4" />
          </Button>

          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            {STATUS_FILTER_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilterChange(status)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg ${
                  statusFilter === status ? 'bg-slate-50 font-semibold text-slate-900' : 'text-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg font-medium">No high-risk fleet found</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filter criteria</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); setStatusFilter('All Status') }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <>
          <FleetTable
            data={paginatedData}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredData.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  )
}
