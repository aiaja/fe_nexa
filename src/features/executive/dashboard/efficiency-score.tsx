import { EfficiencyScore } from "@/interface/executive/dashboard"

interface EfficiencyScoreProps {
  score: EfficiencyScore
}

export function EfficiencyScoreCard({ score }: EfficiencyScoreProps) {
  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return "text-green-600"
    if (scoreValue >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const scoreColor = getScoreColor(score.score)

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold mb-4">Efficiency Score</h3>
      
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
            {/* Score arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeDasharray={`${(score.score / 100) * 251.2} 251.2`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold ${scoreColor}`}>
              {score.score}
            </div>
            <div className="text-sm text-gray-500">/{score.maxScore}</div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">Efficiency Score</div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-green-600 font-medium">{score.change}</span>
          <span className="text-green-600">✓</span>
        </div>
      </div>
    </div>
  )
}