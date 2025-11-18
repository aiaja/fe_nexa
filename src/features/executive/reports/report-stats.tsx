import { FileText, HardDrive, BarChart3 } from 'lucide-react';

interface ReportStatsProps {
  totalPages: number;
  dataPoints: number;
  chartsIncluded: number;
}

export function ReportStats({ totalPages, dataPoints, chartsIncluded }: ReportStatsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[200px]">
      <h3 className="text-white font-semibold mb-4">Report Stats</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-white/80" />
          <div>
            <div className="text-2xl font-bold text-white">{totalPages}</div>
            <div className="text-xs text-white/70">Total Pages</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-white/80" />
          <div>
            <div className="text-2xl font-bold text-white">{dataPoints}</div>
            <div className="text-xs text-white/70">Data Points</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-white/80" />
          <div>
            <div className="text-2xl font-bold text-white">{chartsIncluded}</div>
            <div className="text-xs text-white/70">Charts Included</div>
          </div>
        </div>
      </div>
    </div>
  );
}