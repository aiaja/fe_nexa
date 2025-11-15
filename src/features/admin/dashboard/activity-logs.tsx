import { Clock } from 'lucide-react'
import { ActivityLog } from "@/interface/admin/dashboard"

interface ActivityLogsProps {
  logs: ActivityLog[]
}

export function ActivityLogs({ logs }: ActivityLogsProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm lg:row-span-2">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Log Activity</h3>
      </div>
      <div className="mb-3">
        <div className="text-sm font-medium text-blue-600">Friday, 11 November 2025</div>
      </div>
      <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '600px' }}>
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{log.name}</span>
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                  {log.role}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{log.action}</p>
              <span className="text-xs text-gray-400">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}