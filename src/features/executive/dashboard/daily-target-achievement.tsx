import { DailyTarget } from "@/interface/executive/dashboard"

interface DailyTargetAchievementProps {
  target: DailyTarget
}

export function DailyTargetAchievement({ target }: DailyTargetAchievementProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold mb-4">Daily Target Achievement</h3>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${(target.percentage / 100) * 251.2} 251.2`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900">{target.percentage}%</div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">Daily Target: {target.target}%</div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-green-600 font-medium">{target.status}</span>
          <span className="text-green-600">✓</span>
        </div>
      </div>
    </div>
  )
}