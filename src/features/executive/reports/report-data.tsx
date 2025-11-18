"use client";
import React, { useState } from 'react';
import { Report } from '@/interface/executive/report';
import { PageHeader } from './page-header';
// import { ToastNotification } from './components/toast-notification';
import { EmptyState } from './empty-state';
import { LoadingState } from './loading-state';
import { LatestReportCard } from './latest-report-card';
import { ReportHistory } from './report-history';

interface StrategicReportsProps {
  reports: Report[];
  autoGenerateSchedule: string;
  historyFooterText: string;
  infoTooltipText: string;
}

export default function StrategicReports({
  reports,
  autoGenerateSchedule,
  historyFooterText,
  infoTooltipText
}: StrategicReportsProps) {
  const latestReport = reports.find(r => r.isLatest);
  const historyReports = reports.filter(r => !r.isLatest);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (reportId: string, reportTitle: string) => {
    setDownloadingId(reportId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Downloading report:', reportId);
    setDownloadingId(null);
    setToastMessage(`${reportTitle} downloaded successfully`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (reports.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
        {/* {toastMessage && <ToastNotification message={toastMessage} />} */}
        
        <PageHeader 
          autoGenerateSchedule={autoGenerateSchedule}
          infoTooltipText={infoTooltipText}
        />

        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            {latestReport && (
              <LatestReportCard
                report={latestReport}
                isDownloading={downloadingId === latestReport.id}
                onDownload={handleDownload}
              />
            )}

            <ReportHistory
              reports={historyReports}
              downloadingId={downloadingId}
              footerText={historyFooterText}
              onDownload={handleDownload}
            />
          </>
        )}
      </div>
    </div>
  );
}