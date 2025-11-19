"use client"

import { EfficiencyScore } from "@/interface/executive/dashboard"
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface EfficiencyScoreProps {
  score: EfficiencyScore
}

export function EfficiencyScoreCard({ score }: EfficiencyScoreProps) {
  
  const getScoreStatus = (scoreValue: number) => {
    if (scoreValue >= 80) return { 
      color: "text-green-600", 
      stroke: "#22c55e",
      bg: "bg-green-50",
      label: "Excellent",
      emoji: "🟢"
    }
    if (scoreValue >= 60) return { 
      color: "text-yellow-600", 
      stroke: "#eab308",
      bg: "bg-yellow-50",
      label: "Good",
      emoji: "🟡"
    }
    if (scoreValue >= 40) return { 
      color: "text-orange-600", 
      stroke: "#f97316",
      bg: "bg-orange-50",
      label: "Fair",
      emoji: "🟠"
    }
    return { 
      color: "text-red-600", 
      stroke: "#ef4444",
      bg: "bg-red-50",
      label: "Poor",
      emoji: "🔴"
    }
  }

  const status = getScoreStatus(score.score)
  
  // Calculate circle progress
  const circumference = 2 * Math.PI * 40
  const progress = (score.score / score.maxScore) * circumference
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Header with Icon */}
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-900">Efficiency Score</h3>
      </div>
      
      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-44 h-44">
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
            {/* Progress circle with color */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={status.stroke}
              strokeWidth="8"
              strokeDasharray={`${progress} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${status.color}`}>
              {score.score}
            </div>
            <div className="text-lg text-gray-400 font-medium">/{score.maxScore}</div>
          </div>
        </div>
      </div>
      
      {/* Status and Trend */}
      <div className="space-y-3">
        {/* Status Badge */}
        <div className="flex items-center justify-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.bg}`}>
            <span>{status.emoji}</span>
            <span className={`text-sm font-semibold ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>
        
        {/* Trend */}
        <div className="flex items-center justify-center">
          <div className={`
            inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full
            ${score.changePositive 
              ? 'text-green-600 bg-green-50' 
              : 'text-red-600 bg-red-50'
            }
          `}>
            {score.changePositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{score.change}</span>
          </div>
        </div>
      </div>
    </div>
  )
}