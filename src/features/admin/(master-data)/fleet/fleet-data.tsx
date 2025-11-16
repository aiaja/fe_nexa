"use client"

import { useState, useMemo } from 'react'
import { Search, Filter, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { FleetData } from "@/interface/admin/fleet"
import { FilterModal, FilterValues } from "./filter-modal"
import { ActionModal } from "./action-modal"
import { DeleteConfirmationModal } from "./delete-modal"
import { AddFleetModal } from "./add-modal"
import { EditFleetModal } from "./edit-modal"

function FilterIconFilled({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}

interface FleetMasterProps {
  fleetItems: FleetData[]
}

export default function FleetMaster({ fleetItems: initialFleetItems }: FleetMasterProps) {
  const [fleetItems, setFleetItems] = useState<FleetData[]>(initialFleetItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedFleet, setSelectedFleet] = useState<FleetData | null>(null)
  const [selectedRows, setSelectedRows] = useState<FleetData[]>([])
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 })
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterValues>({
    types: [],
    statuses: [],
    yearRange: { min: "", max: "" }
  })

  const activeFleetItems = useMemo(() => {
    return fleetItems.filter(item => !deletedIds.includes(item.id))
  }, [fleetItems, deletedIds])

  const filteredData = useMemo(() => {
    let result = activeFleetItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((fleet) => {
        return (
          fleet.id.toLowerCase().includes(query) ||
          fleet.plateNumber.toLowerCase().includes(query) ||
          fleet.brands.toLowerCase().includes(query) ||
          fleet.model.toLowerCase().includes(query)
        )
      })
    }

    if (filters.types.length > 0) {
      result = result.filter(fleet => filters.types.includes(fleet.type))
    }

    if (filters.statuses.length > 0) {
      result = result.filter(fleet => filters.statuses.includes(fleet.status))
    }

    if (filters.yearRange.min || filters.yearRange.max) {
      result = result.filter(fleet => {
        const year = parseInt(fleet.year)
        const min = filters.yearRange.min ? parseInt(filters.yearRange.min) : 0
        const max = filters.yearRange.max ? parseInt(filters.yearRange.max) : 9999
        return year >= min && year <= max
      })
    }

    return result
  }, [activeFleetItems, searchQuery, filters])

  const activeFilterCount = 
    filters.types.length + 
    filters.statuses.length + 
    (filters.yearRange.min || filters.yearRange.max ? 1 : 0)

  const hasActiveFilters = activeFilterCount > 0

  const handleActionClick = (fleet: FleetData, position: { top: number; left: number }) => {
    setSelectedFleet(fleet)
    setActionPosition(position)
    setIsActionOpen(true)
  }

  const handleEditClick = (fleet: FleetData) => {
    setSelectedFleet(fleet)
    setIsEditOpen(true)
  }

  const handleSelectionChange = (rows: FleetData[]) => {
    setSelectedRows(rows)
  }

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return
    setIsDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    const idsToDelete = selectedRows.map(row => row.id)
    const count = idsToDelete.length
    
    setDeletedIds(prev => [...prev, ...idsToDelete])
    setSelectedRows([])
    
    // Toast notification untuk bulk delete
    toast.success(`${count} fleet${count > 1 ? 's' : ''} deleted successfully!`, {
      description: `${count} vehicle${count > 1 ? 's have' : ' has'} been removed from the system`,
    })
  }

  const handleAddSuccess = (newFleet: FleetData) => {
    setFleetItems(prev => [...prev, newFleet])
    
    // Toast notification untuk add fleet
    toast.success('Fleet added successfully!', {
      description: `${newFleet.id} - ${newFleet.plateNumber} has been added to the system`,
    })
  }

  const handleEditSuccess = (updatedFleet: FleetData) => {
    setFleetItems(prev => 
      prev.map(fleet => fleet.id === updatedFleet.id ? updatedFleet : fleet)
    )
    
    // Toast notification untuk edit fleet
    toast.success('Fleet updated successfully!', {
      description: `${updatedFleet.id} - ${updatedFleet.plateNumber} has been updated`,
    })
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Fleet Master</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Fleet ID, Plate Number, Brands, or Model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className={`relative flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              hasActiveFilters 
                ? 'border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {hasActiveFilters ? (
              <FilterIconFilled className="h-4 w-4" />
            ) : (
              <Filter className="h-4 w-4" />
            )}
            {hasActiveFilters ? 'Filtered by' : 'Filter by'}
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button 
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete {selectedRows.length > 0 && `(${selectedRows.length})`}
            </button>
            
            <button 
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Data
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={filteredData}
          onActionClick={handleActionClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <FilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={setFilters}
        currentFilters={filters}
      />

      <ActionModal
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        fleet={selectedFleet}
        position={actionPosition}
        onEditClick={handleEditClick}
      />

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        count={selectedRows.length}
      />

      <AddFleetModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleAddSuccess}
      />

      <EditFleetModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        fleet={selectedFleet}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}