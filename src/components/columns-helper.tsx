import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical, ChevronDown } from "lucide-react"

export const SortableHeader = ({ column, label }: any) => (
  <button
    className="flex items-center gap-1 select-none hover:text-gray-900 transition-colors"
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

export function createSelectionColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="w-4 h-4 rounded border-gray-300"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="w-4 h-4 rounded border-gray-300"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}


export function createTextColumn<T>(
  accessorKey: string,
  label: string,
  options?: {
    sortable?: boolean
    className?: string
    fontWeight?: "normal" | "medium" | "semibold"
  }
): ColumnDef<T> {
  const { sortable = true, className = "text-sm text-gray-600", fontWeight = "normal" } = options || {}
  
  const fontClass = {
    normal: "",
    medium: "font-medium text-gray-900",
    semibold: "font-semibold text-gray-900"
  }[fontWeight]

  return {
    accessorKey,
    header: sortable 
      ? ({ column }) => <SortableHeader column={column} label={label} />
      : label,
    cell: ({ row }) => (
      <div className={`${className} ${fontClass}`}>
        {row.getValue(accessorKey) as string}
      </div>
    ),
  }
}


export function createStatusColumn<T>(
  accessorKey: string = "status",
  label: string = "Status",
  statusColors?: Record<string, string>
): ColumnDef<T> {
  const defaultColors: Record<string, string> = {
    "Active": "bg-green-100 text-green-700",
    "Inactive": "bg-gray-100 text-gray-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    "Suspended": "bg-red-100 text-red-700",
    "On Leave": "bg-blue-100 text-blue-700",
    "Maintenance": "bg-orange-100 text-orange-700",
  }

  const colors = statusColors || defaultColors

  return {
    accessorKey,
    header: ({ column }) => <SortableHeader column={column} label={label} />,
    cell: ({ row }) => {
      const status = row.getValue(accessorKey) as string
      const colorClass = colors[status] || "bg-gray-100 text-gray-700"

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
        >
          {status}
        </span>
      )
    },
  }
}

export function createActionsColumn<T>(options?: {
  position?: { top?: number; left?: number }
}): ColumnDef<T> {
  const { position = { top: 4, left: -140 } } = options || {}

  return {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row, table }) => {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const rect = e.currentTarget.getBoundingClientRect()
        const meta = table.options.meta as { 
          onActionClick?: (row: T, position: { top: number; left: number }) => void 
        }
        
        if (meta?.onActionClick) {
          meta.onActionClick(row.original, {
            top: rect.bottom + (position.top || 4),
            left: rect.left + (position.left || -140)
          })
        }
      }

      return (
        <button 
          onClick={handleClick}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Open actions menu"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      )
    },
  }
}

export function createDateColumn<T>(
  accessorKey: string,
  label: string,
  options?: {
    locale?: string
    format?: Intl.DateTimeFormatOptions
  }
): ColumnDef<T> {
  const { 
    locale = "id-ID", 
    format = { day: "2-digit", month: "short", year: "numeric" } 
  } = options || {}

  return {
    accessorKey,
    header: ({ column }) => <SortableHeader column={column} label={label} />,
    cell: ({ row }) => {
      const date = new Date(row.getValue(accessorKey) as string)
      return (
        <div className="text-sm text-gray-600">
          {date.toLocaleDateString(locale, format)}
        </div>
      )
    },
  }
}