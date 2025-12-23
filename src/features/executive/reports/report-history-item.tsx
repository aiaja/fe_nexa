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
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base wrap-break-word">{report.title}</h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Generated: {report.generatedAt}</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <span>{report.fileSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
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
        className="flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-50 text-sm sm:text-base w-full sm:w-auto shrink-0"
        aria-label={`Download ${report.title}`}
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download</span>
          </>
        )}
      </button>
    </div>
  );
}