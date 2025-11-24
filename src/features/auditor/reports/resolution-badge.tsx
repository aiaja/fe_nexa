"use client";

import React from 'react';
import { Lock, User, Truck, CheckCircle } from 'lucide-react';
import { ResolutionType } from '@/interface/auditor/reports';

interface ResolutionBadgeProps {
  resolution: ResolutionType;
}

const resolutionConfig: Record<ResolutionType, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  'confirmed_theft': {
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: <Lock className="w-3 h-3" />,
    label: 'Confirmed Theft',
  },
  'driver_behavior': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: <User className="w-3 h-3" />,
    label: 'Driver Behavior',
  },
  'fleet_issue': {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    icon: <Truck className="w-3 h-3" />,
    label: 'Fleet Issue',
  },
  'no_violation': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <CheckCircle className="w-3 h-3" />,
    label: 'No Violation',
  },
};

export function ResolutionBadge({ resolution }: ResolutionBadgeProps) {
  const config = resolutionConfig[resolution];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}
