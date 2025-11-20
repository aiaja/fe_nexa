"use client";

import React from 'react';
import { SeverityType } from '@/interface/auditor/reports';

interface SeverityBadgeProps {
  severity: SeverityType;
}

const severityConfig: Record<SeverityType, { bg: string; text: string; circle: string }> = {
  'CRITICAL': { bg: 'bg-red-50', text: 'text-red-700', circle: 'text-red-500' },
  'HIGH': { bg: 'bg-orange-50', text: 'text-orange-700', circle: 'text-orange-500' },
  'MEDIUM': { bg: 'bg-yellow-50', text: 'text-yellow-700', circle: 'text-yellow-500' },
  'LOW': { bg: 'bg-green-50', text: 'text-green-700', circle: 'text-green-500' },
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 rounded-full ${config.circle}`} />
      {severity}
    </div>
  );
}
