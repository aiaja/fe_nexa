"use client"

import { Search, Filter, Plus, Trash2 } from 'lucide-react'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { DriverData } from "@/interface/admin/driver"

interface DriverMasterProps {
  driverItems: DriverData[]
}

export default function DriverMaster({ driverItems }: DriverMasterProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Driver Master</h1>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Driver"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter by
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <Trash2 className="h-4 w-4" />
              Delete Data
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Add Data
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Data Table Component */}
        <DataTable columns={columns} data={driverItems} />
      </div>
    </div>
  )
}