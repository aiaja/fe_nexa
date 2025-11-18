import React from 'react';
import { Download, Calendar, FileText, Loader2, HardDrive, FileType } from 'lucide-react';
import { Report } from '@/interface/executive/report';

interface ReportHistoryItemProps {
  report: Report;
  isDownloading: boolean;
  onDownload: (reportId: string, reportTitle: string) => void;
}

export function ReportHistoryItem({ report, isDownloading, onDownload }: ReportHistoryItemProps) {
  return (
    <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Generated: {report.generatedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive className="w-4 h-4" />
              <span>{report.fileSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                <FileType className="w-3 h-3 mr-1" />
                {report.format}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onDownload(report.id, report.title)}
        disabled={isDownloading}
        className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg hover:bg-blue-50"
        aria-label={`Download ${report.title}`}
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download</span>
          </>
        )}
      </button>
    </div>
  );
}