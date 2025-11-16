"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical, ChevronDown } from "lucide-react"
import { FleetData } from "@/interface/admin/fleet"

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

export const columns: ColumnDef<FleetData>[] = [
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
      <SortableHeader column={column} label="Fleet ID" />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <SortableHeader column={column} label="Plate Number" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("plateNumber")}</div>
    ),
  },
  {
    accessorKey: "brands",
    header: ({ column }) => (
      <SortableHeader column={column} label="Brands" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("brands")}</div>
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <SortableHeader column={column} label="Model" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("model")}</div>
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
        if (status === "Maintenance") return "bg-orange-100 text-orange-700"
        if (status === "Inactive") return "bg-gray-100 text-gray-700"
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
    cell: ({ row, table }) => {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const rect = e.currentTarget.getBoundingClientRect()
        // @ts-ignore - custom meta property
        if (table.options.meta?.onActionClick) {
          // @ts-ignore
          table.options.meta.onActionClick(row.original, {
            top: rect.bottom + 4,
            left: rect.left - 140
          })
        }
      }

      return (
        <button 
          onClick={handleClick}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      )
    },
  },
]