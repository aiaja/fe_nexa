import { X, LogIn, Edit3, UserPlus, Trash2, FileText, Settings } from "lucide-react"
import { UserData } from "@/interface/admin/user"

interface ActivityModalProps {
  open: boolean
  onClose: () => void
  user: UserData | null
}

interface ActivityItem {
  id: string
  type: 'login' | 'update' | 'create' | 'delete' | 'view' | 'settings'
  action: string
  timestamp: string
  details: string
  icon: any
}

// Activity data tiap user sama, mock datanya ini
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'login',
    action: 'Logged in to system',
    timestamp: 'Nov 18, 10:30',
    details: 'IP: 192.168.1.100 • Chrome on Windows',
    icon: LogIn
  },
  {
    id: '2',
    type: 'update',
    action: 'Updated fleet data',
    timestamp: 'Nov 18, 09:15',
    details: 'Target: Fleet TRK-0001',
    icon: Edit3
  },
  {
    id: '3',
    type: 'create',
    action: 'Created new user',
    timestamp: 'Nov 18, 07:45',
    details: 'Target: User: Jane Smith',
    icon: UserPlus
  },
  {
    id: '4',
    type: 'view',
    action: 'Viewed dashboard analytics',
    timestamp: 'Nov 17, 16:20',
    details: 'Section: Fleet Performance Report',
    icon: FileText
  },
  {
    id: '5',
    type: 'delete',
    action: 'Deleted maintenance record',
    timestamp: 'Nov 17, 14:10',
    details: 'Target: Maintenance #MNT-0234',
    icon: Trash2
  },
  {
    id: '6',
    type: 'settings',
    action: 'Updated account settings',
    timestamp: 'Nov 17, 11:05',
    details: 'Changed notification preferences',
    icon: Settings
  },
  {
    id: '7',
    type: 'login',
    action: 'Logged in to system',
    timestamp: 'Nov 17, 08:00',
    details: 'IP: 192.168.1.100 • Chrome on Windows',
    icon: LogIn
  }
]

export function ActivityModal({ open, onClose, user }: ActivityModalProps) {
  if (!open || !user) return null

  const getIconColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'login':
        return 'text-blue-600 bg-blue-50'
      case 'update':
        return 'text-amber-600 bg-amber-50'
      case 'create':
        return 'text-green-600 bg-green-50'
      case 'delete':
        return 'text-red-600 bg-red-50'
      case 'view':
        return 'text-purple-600 bg-purple-50'
      case 'settings':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 max-h-[90vh] flex flex-col">
        <div className="flex items-start justify-between p-6 border-b">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">User Activity</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{user.name}</span>
              <span>•</span>
              <span>{user.email}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

    
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {mockActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="relative">
                
                  {index !== mockActivities.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-0 w-px bg-gray-200" />
                  )}
                  
            
                  <div className="flex gap-3">
            
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getIconColor(activity.type)} z-10`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        {activity.timestamp}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            Showing recent activities • Last 7 days
          </p>
        </div>
      </div>
    </>
  )
}