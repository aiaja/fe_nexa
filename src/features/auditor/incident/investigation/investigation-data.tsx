"use client";

import React from 'react';
import { CaseSummary } from './case-summary';
import { RouteTimeline } from './route-timeline';
import { InvestigationData } from '@/interface/auditor/incident-reports/investigation';

interface InvestigationPageProps {
  data: InvestigationData;
  title: string; // bisa tetap untuk metadata, tapi tidak diteruskan ke CaseSummary
}

export default function InvestigationPage({ data }: InvestigationPageProps) {
  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-6 gap-6">
      <CaseSummary summary={data.summary} />
      <RouteTimeline events={data.timeline} />
    </div>
  );
}
