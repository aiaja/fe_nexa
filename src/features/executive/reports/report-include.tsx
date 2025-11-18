import { CheckCircle } from 'lucide-react';

interface ReportIncludesProps {
  includes: string[];
}

export function ReportIncludes({ includes }: ReportIncludesProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[280px]">
      <h3 className="text-white font-semibold mb-4">Report Includes</h3>
      <div className="space-y-3">
        {includes.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-white/90">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}