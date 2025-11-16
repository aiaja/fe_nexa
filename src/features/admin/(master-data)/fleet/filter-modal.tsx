"use client"

import { useState, useMemo } from 'react'
import { X } from 'lucide-react'
import { FleetType, FleetStatus } from '@/interface/admin/fleet'

interface FilterModalProps {
  open: boolean
  onClose: () => void
  onApply: (filters: FilterValues) => void
  currentFilters: FilterValues
}

export interface FilterValues {
  types: FleetType[]
  statuses: FleetStatus[]
  yearRange: { min: string; max: string }
}

export function FilterModal({ open, onClose, onApply, currentFilters }: FilterModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<FleetType[]>(currentFilters.types)
  const [selectedStatuses, setSelectedStatuses] = useState<FleetStatus[]>(currentFilters.statuses)
  const [yearMin, setYearMin] = useState(currentFilters.yearRange.min)
  const [yearMax, setYearMax] = useState(currentFilters.yearRange.max)

  const fleetTypes: FleetType[] = ["Haul Truck", "Dump Truck", "Tanker", "Excavator", "Bulldozer", "Loader"]
  const fleetStatuses: FleetStatus[] = ["Active", "Inactive", "Maintenance", "Under Review"]
  
  const years = Array.from({ length: 15 }, (_, i) => (2010 + i).toString())

  const handleTypeToggle = (type: FleetType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleStatusToggle = (status: FleetStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const handleApply = () => {
    onApply({
      types: selectedTypes,
      statuses: selectedStatuses,
      yearRange: { min: yearMin, max: yearMax }
    })
    onClose()
  }

  // Cancel = reset semua filter
  const handleCancel = () => {
    const resetFilters = {
      types: [],
      statuses: [],
      yearRange: { min: "", max: "" }
    }
    setSelectedTypes([])
    setSelectedStatuses([])
    setYearMin("")
    setYearMax("")
    onApply(resetFilters)
    onClose()
  }

  // X button = kembali ke filter yang terakhir di-apply
  const handleClose = () => {
    setSelectedTypes(currentFilters.types)
    setSelectedStatuses(currentFilters.statuses)
    setYearMin(currentFilters.yearRange.min)
    setYearMax(currentFilters.yearRange.max)
    onClose()
  }

  // Update state ketika modal dibuka
  useMemo(() => {
    if (open) {
      setSelectedTypes(currentFilters.types)
      setSelectedStatuses(currentFilters.statuses)
      setYearMin(currentFilters.yearRange.min)
      setYearMax(currentFilters.yearRange.max)
    }
  }, [open, currentFilters])

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md z-50 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filter by:</h3>
            <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Fleet Type */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Fleet Type</h4>
              <div className="grid grid-cols-2 gap-3">
                {fleetTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fleet Status */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Fleet Status</h4>
              <div className="grid grid-cols-2 gap-3">
                {fleetStatuses.map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => handleStatusToggle(status)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Year Range</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">From</label>
                  <select
                    value={yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">To</label>
                  <select
                    value={yearMax}
                    onChange={(e) => setYearMax(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )
}