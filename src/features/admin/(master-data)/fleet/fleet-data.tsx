"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { FleetData } from "@/interface/admin/fleet"
import { FilterPopover, FilterValues } from "./filter-popover"
import { ActionModal } from "@/components/action-modal"
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { AddFleetModal } from "./add-modal"
import { EditFleetModal } from "./edit-modal"

interface FleetMasterProps {
  fleetItems: FleetData[]
}

const STORAGE_KEY = 'fleets-data'

export default function FleetMaster({ fleetItems: initialFleetItems }: FleetMasterProps) {
  const [fleetItems, setFleetItems] = useState<FleetData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
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

  useEffect(() => {
    loadFleetsData()
  }, [])

  const loadFleetsData = () => {
    setIsLoading(true)
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        
        if (parsedData.fleets && Array.isArray(parsedData.fleets)) {
          setFleetItems(parsedData.fleets)
          setDeletedIds(parsedData.deletedIds || [])
        } else {
          setFleetItems(parsedData)
        }
      } else {
        setFleetItems(initialFleetItems)
        saveToStorage(initialFleetItems, [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      setFleetItems(initialFleetItems)
      saveToStorage(initialFleetItems, [])
    } finally {
      setIsLoading(false)
    }
  }

  const saveToStorage = (updatedFleets: FleetData[], updatedDeletedIds?: string[]) => {
    try {
      const dataToSave = {
        fleets: updatedFleets,
        deletedIds: updatedDeletedIds !== undefined ? updatedDeletedIds : deletedIds
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Failed to save to storage:', error)
      toast.error("Failed to save data", {
        description: "Your changes may not persist after refresh"
      })
    }
  }

  const activeFleetItems = useMemo(() => {
    return fleetItems.filter(item => !deletedIds.includes(item.id))
  }, [fleetItems, deletedIds])

  const filteredData = useMemo(() => {
    let result = activeFleetItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(fleet =>
        fleet.fleetId.toLowerCase().includes(query) ||
        fleet.licensePlate.toLowerCase().includes(query) ||
        fleet.brands.toLowerCase().includes(query) ||
        fleet.model.toLowerCase().includes(query)
      )
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

    const updatedDeletedIds = [...deletedIds, ...idsToDelete]
    setDeletedIds(updatedDeletedIds)
    setSelectedRows([])

    saveToStorage(fleetItems, updatedDeletedIds)

    toast.success(`${count} fleet${count > 1 ? "s" : ""} deleted successfully!`, {
      description: `${count} vehicle${count > 1 ? "s have" : " has"} been removed from the system`
    })
  }

  const handleAddSuccess = (newFleet: FleetData) => {
    const updatedFleets = [...fleetItems, newFleet]
    setFleetItems(updatedFleets)
    
    saveToStorage(updatedFleets)
    
    toast.success("Fleet added successfully!", {
      description: `${newFleet.fleetId} - ${newFleet.licensePlate} has been added to the system`
    })
  }

  const handleEditSuccess = (updatedFleet: FleetData) => {
    const updatedFleets = fleetItems.map(fleet => 
      fleet.id === updatedFleet.id ? updatedFleet : fleet
    )
    setFleetItems(updatedFleets)
    
    saveToStorage(updatedFleets)
    
    toast.success("Fleet updated successfully!", {
      description: `${updatedFleet.fleetId} - ${updatedFleet.licensePlate} has been updated`
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading fleets data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Fleet Master</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by Fleet ID, License Plate, Brand, or Model"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 focus-visible:ring-0 focus-visible:border-[#0047AB]"
            />
          </div>

          <FilterPopover onApply={setFilters} currentFilters={filters} />

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>

            <Button
              onClick={() => setIsAddOpen(true)}
              className="gap-2 bg-[#0047AB] hover:bg-[#003580]"
            >
              Add Data
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          onActionClick={handleActionClick}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <ActionModal<FleetData>
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedFleet}
        position={actionPosition}
        onEditClick={handleEditClick}
        detailPath="/admin/fleet"
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
        existingFleets={activeFleetItems}
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