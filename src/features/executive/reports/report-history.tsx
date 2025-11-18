import React from 'react';
import { Report } from '@/interface/executive/report';
import { ReportHistoryItem } from './report-history-item';

interface ReportHistoryProps {
  reports: Report[];
  downloadingId: string | null;
  footerText: string;
  onDownload: (reportId: string, reportTitle: string) => void;
}

export function ReportHistory({ reports, downloadingId, footerText, onDownload }: ReportHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Report History</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {reports.map((report) => (
          <ReportHistoryItem
            key={report.id}
            report={report}
            isDownloading={downloadingId === report.id}
            onDownload={onDownload}
          />
        ))}
      </div>

      <div className="p-6 text-center text-sm text-gray-500 border-t border-gray-200">
        {footerText}
      </div>
    </div>
  );
}