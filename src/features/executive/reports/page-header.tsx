import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';

interface PageHeaderProps {
  autoGenerateSchedule: string;
  infoTooltipText: string;
}

export function PageHeader({ autoGenerateSchedule, infoTooltipText }: PageHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Strategic Reports</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Auto-generated: {autoGenerateSchedule}</span>
        </div>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Information about report generation"
          >
            <Info className="w-5 h-5" />
          </button>
          {showTooltip && (
            <div className="absolute right-0 top-8 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-10">
              {infoTooltipText}
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}