"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { UserData } from "@/interface/admin/user"
import { FilterPopover, FilterValues } from "./filter-popover"
import { DeleteConfirmationModal } from "@/components/delete-modal"
import { AddUserModal } from "./add-modal"
import { EditUserModal } from "./edit-modal"
import { UserActionModal } from "./action-modal"
import { ActivityModal } from "./activity-modal"

interface UserManagementProps {
  userItems: UserData[]
}

const STORAGE_KEY = 'users-data'

export default function UserManagement({ userItems: initialUserItems }: UserManagementProps) {
  const [userItems, setUserItems] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [selectedRows, setSelectedRows] = useState<UserData[]>([])
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 })
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterValues>({
    roles: [],
    statuses: [],
    departments: []
  })

  useEffect(() => {
    loadUsersData()
  }, [])

  const loadUsersData = () => {
    setIsLoading(true)
    try {
      const savedData = localStorage.getItem(STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        
        if (parsedData.users && Array.isArray(parsedData.users)) {
          setUserItems(parsedData.users)
          setDeletedIds(parsedData.deletedIds || [])
        } else {
          setUserItems(parsedData)
        }
      } else {
        setUserItems(initialUserItems)
        saveToStorage(initialUserItems, [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      setUserItems(initialUserItems)
      saveToStorage(initialUserItems, [])
    } finally {
      setIsLoading(false)
    }
  }

  const saveToStorage = (updatedUsers: UserData[], updatedDeletedIds?: string[]) => {
    try {
      const dataToSave = {
        users: updatedUsers,
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

  const activeUserItems = useMemo(() => {
    return userItems.filter(item => !deletedIds.includes(item.id))
  }, [userItems, deletedIds])

  // Extract existing usernames and emails for validation
  const existingUsernames = useMemo(() => 
    activeUserItems.map(u => u.username.toLowerCase()), 
    [activeUserItems]
  )

  const existingEmails = useMemo(() => 
    activeUserItems.map(u => u.email.toLowerCase()), 
    [activeUserItems]
  )

  const filteredData = useMemo(() => {
    let result = activeUserItems

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(user =>
        user.id.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      )
    }

    if (filters.roles && filters.roles.length > 0) {
      result = result.filter(user => filters.roles.includes(user.role))
    }

    if (filters.statuses && filters.statuses.length > 0) {
      result = result.filter(user => filters.statuses.includes(user.status))
    }

    return result
  }, [activeUserItems, searchQuery, filters])

  const handleActionClick = (user: UserData, position: { top: number; left: number }) => {
    setSelectedUser(user)
    setActionPosition(position)
    setIsActionOpen(true)
  }

  const handleEditClick = (user: UserData) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const handleViewActivity = (user: UserData) => {
    setSelectedUser(user)
    setIsActivityOpen(true)
  }

  const handleToggleStatus = (user: UserData) => {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active'
    const updatedUser = { ...user, status: newStatus as UserData['status'] }
    
    const updatedUsers = userItems.map(u => 
      u.id === user.id ? updatedUser : u
    )
    setUserItems(updatedUsers)
    saveToStorage(updatedUsers)
    
    toast.success(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully!`, {
      description: `${user.name} is now ${newStatus.toLowerCase()}`
    })
  }

  const handleSelectionChange = (rows: UserData[]) => {
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

    saveToStorage(userItems, updatedDeletedIds)

    toast.success(`${count} user${count > 1 ? "s" : ""} deleted successfully!`, {
      description: `${count} user${count > 1 ? "s have" : " has"} been removed from the system`
    })
  }

  const handleAddSuccess = (newUser: UserData) => {
    const updatedUsers = [...userItems, newUser]
    setUserItems(updatedUsers)
    
    saveToStorage(updatedUsers)
    
    toast.success("User added successfully!", {
      description: `${newUser.name} has been added to the system`
    })
  }

  const handleEditSuccess = (updatedUser: UserData) => {
    const updatedUsers = userItems.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    )
    setUserItems(updatedUsers)
    
    saveToStorage(updatedUsers)
    
    toast.success("User updated successfully!", {
      description: `${updatedUser.name} has been updated`
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0047AB]"></div>
        <p className="mt-4 text-sm text-gray-500">Loading users data...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        </div>

        {/* Desktop: horizontal | Mobile: 2 rows */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 md:gap-3 flex-1 md:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by Name, Email, or Username"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 focus-visible:ring-0 focus-visible:border-[#0047AB]"
              />
            </div>

            <div className="md:hidden">
              <FilterPopover onApply={setFilters} currentFilters={filters} />
            </div>
          </div>

          <div className="hidden md:block">
            <FilterPopover onApply={setFilters} currentFilters={filters} />
          </div>

          <div className="flex items-center gap-2 md:ml-auto">
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={selectedRows.length === 0}
              className="gap-2 flex-1 md:flex-initial"
            >
              <Trash2 className="h-4 w-4" />
              Delete {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>

            <Button
              onClick={() => setIsAddOpen(true)}
              className="gap-2 bg-[#0047AB] hover:bg-[#003580] flex-1 md:flex-initial"
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

      <UserActionModal
        open={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        data={selectedUser}
        position={actionPosition}
        onEditClick={handleEditClick}
        onViewActivity={handleViewActivity}
        onToggleStatus={handleToggleStatus}
      />

      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        count={selectedRows.length}
      />

      <AddUserModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleAddSuccess}
        existingUsernames={existingUsernames}
        existingEmails={existingEmails}
      />

      <EditUserModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
        onSuccess={handleEditSuccess}
        existingUsernames={existingUsernames}
        existingEmails={existingEmails}
      />

      <ActivityModal
        open={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        user={selectedUser}
      />
    </div>
  )
}