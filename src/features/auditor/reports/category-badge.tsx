"use client";

import React from 'react';
import { CategoryType } from '@/interface/auditor/reports';

interface CategoryBadgeProps {
  category: CategoryType;
}

const categoryConfig: Record<CategoryType, { bg: string; text: string; label: string }> = {
  'SUDDEN DROP': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sudden Drop' },
  'OUT OF ZONE': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Out Of Zone' },
  'OVERCONSUMPTION': { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Overconsumption' },
  'SENSOR MALFUNCTION': { bg: 'bg-red-100', text: 'text-red-700', label: 'Sensor Malfunction' },
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
