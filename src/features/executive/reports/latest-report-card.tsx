import React from 'react';
import { Download, CheckCircle, Calendar, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Report } from '@/interface/executive/report';
import { ReportIncludes } from './report-include';

interface LatestReportCardProps {
  report: Report;
  isDownloading: boolean;
  onDownload: (reportId: string, reportTitle: string) => void;
}

export function LatestReportCard({ report, isDownloading, onDownload }: LatestReportCardProps) {
  return (
    <div className="bg-linear-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-8 shadow-lg">
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <div className="text-white/80 text-sm font-medium mb-4">Latest Report</div>
          <h2 className="text-4xl font-bold text-white mb-2">{report.title}</h2>
          <p className="text-white/90 text-lg mb-6">Monthly Executive Summary Report</p>
          
          <div className="flex items-center gap-6 mb-2">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Auto-generated</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Generated on {report.generatedDate}</span>
            </div>
            {report.totalPages && (
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <FileText className="w-4 h-4" />
                <span>{report.totalPages} Pages</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Button
              onClick={() => onDownload(report.id, report.title)}
              disabled={isDownloading}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md"
              aria-label={`Download ${report.title} report`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  <span>Download Report</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {report.includes && report.includes.length > 0 && (
          <ReportIncludes includes={report.includes} />
        )}
      </div>
    </div>
  );
}