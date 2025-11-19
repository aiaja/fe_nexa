
"use client";

import React from 'react';
import { CaseSummary } from './case-summary';
import { RouteTimeline } from './route-timeline';
import { InvestigationData } from '@/interface/auditor/incident-reports/investigation';

interface InvestigationPageProps {
  data: InvestigationData;
  title: string;
}

export default function InvestigationPage({ data, title }: InvestigationPageProps) {
  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 p-6">
          <CaseSummary summary={data.summary} title={title} />
          <RouteTimeline events={data.timeline} />
        </div>
      </div>
    </div>
  );
}