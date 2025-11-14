"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical, ChevronDown } from "lucide-react"
import { DriverData } from "@/interface/admin/driver" 

const SortableHeader = ({ column, label }: any) => (
  <button
    className="flex items-center gap-1 select-none"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {label}
    <ChevronDown
      className={`h-4 w-4 transition-transform ${
        column.getIsSorted() === "asc"
          ? "rotate-180"
          : column.getIsSorted() === "desc"
          ? ""
          : "opacity-30"
      }`}
    />
  </button>
)

export const columns: ColumnDef<DriverData>[] = [ 
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="w-4 h-4 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="w-4 h-4 rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  
  {
    accessorKey: "id",
    header: ({ column }) => (
      <SortableHeader column={column} label="Driver ID" />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column} label="Nama" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "license",
    header: ({ column }) => (
      <SortableHeader column={column} label="License" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("license")}</div>
    ),
  },
  {
    accessorKey: "truck_id", 
    header: ({ column }) => (
      <SortableHeader column={column} label="Assigned Truck" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("truck_id")}</div> 
      
    ),
  },
  {
    accessorKey: "incident",
    header: ({ column }) => (
      <SortableHeader column={column} label="Incident" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("incident")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column} label="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const getStatusStyle = (status: string) => {
        if (status === "Active") return "bg-green-100 text-green-700"
        if (status === "Under Review") return "bg-yellow-100 text-yellow-700"
        if (status === "Suspended") return "bg-red-100 text-red-700"
        return "bg-gray-100 text-gray-700"
      }

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      )
    },
  },

  
  {
    id: "actions",
    enableSorting: false,
    cell: () => (
      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </button>
    ),
  },
]