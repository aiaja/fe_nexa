import { Clock, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ActivityLog {
  name: string
  role: string
  action: string
  time: string
}

interface ActivityLogsProps {
  logs: ActivityLog[]
}

export function ActivityLogs({ logs }: ActivityLogsProps) {
  const [displayLogs, setDisplayLogs] = useState(logs)

  useEffect(() => {
    const interval = setInterval(() => {
      const mockActivities = [
        { name: "John Doe", role: "Manager", action: "Viewed dashboard analytics", time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) },
        { name: "Jane Smith", role: "Auditor", action: "Exported compliance report", time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) },
        { name: "Mike Johnson", role: "Supervisor", action: "Updated vehicle status", time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) },
      ]
      
      const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)]
      
      setDisplayLogs(prev => [randomActivity, ...prev].slice(0, 10))
    }, 30000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Log Activity</h3>
      </div>
      
      <div className="mb-3">
        <div className="text-sm font-medium text-blue-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      

      <div className="flex-1 overflow-y-auto space-y-3" style={{ minHeight: '320px', maxHeight: '320px' }}>
        {displayLogs.length > 0 ? (
          displayLogs.map((log, index) => (
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
          ))
        ) : (
         
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 font-medium">No activity yet</p>
            <p className="text-xs text-gray-400 mt-1">Activity logs will appear here</p>
          </div>
        )}
      </div>
      
      {displayLogs.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <button 
            onClick={() => {
              // Navigate to dedicated activity log page (future)
              console.log('Navigate to full activity log page')
            }}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            View All Activity
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function ActivityLogsDemo() {
  const sampleLogs = [
    { name: "Amanda Wan", role: "Supervisor", action: "Logged in to system", time: "22:02" },
    { name: "Lisa Lim", role: "Supervisor", action: "Downloaded October 2024 Monthly Summary Report", time: "21:45" },
    { name: "Robert Kim", role: "Auditor", action: "Logged in to system", time: "21:30" },
    { name: "Sarah Micel", role: "Manager", action: "Updated driver DRV-001 schedule", time: "20:15" },
    { name: "Sarah Micel", role: "Manager", action: "Logged in to system", time: "20:15" },
    { name: "Lisa Lim", role: "Supervisor", action: "Logged in to system", time: "21:45" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <ActivityLogs logs={sampleLogs} />
      </div>
    </div>
  )
}