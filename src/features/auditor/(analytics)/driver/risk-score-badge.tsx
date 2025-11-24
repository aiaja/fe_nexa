interface RiskScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskScoreBadge({ score, size = 'md' }: RiskScoreBadgeProps) {
  const getRiskColorClass = (score: number) => {
    if (score >= 80) return 'bg-red-500 text-white'; // Critical: 80-100
    if (score >= 60) return 'bg-orange-500 text-white'; // High: 60-79
    if (score >= 40) return 'bg-yellow-500 text-white'; // Medium: 40-59
    return 'bg-green-500 text-white'; // Low: 0-39
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'Critical';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-bold',
    lg: 'w-12 h-12 text-base font-bold',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${getRiskColorClass(score)} ${sizeClasses[size]}`}
      title={`${getRiskLabel(score)} Risk (${score})`}
    >
      {score}
    </span>
  );
}
