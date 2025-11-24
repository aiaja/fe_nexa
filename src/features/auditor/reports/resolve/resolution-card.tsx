'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ResolutionOption as ImportedResolutionOption } from '@/interface/auditor/incident-reports/resolve';

// UI-enhanced version of ResolutionOption
interface UIResolutionOption extends Omit<ImportedResolutionOption, 'icon'> {
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface ResolutionCardProps {
  option: UIResolutionOption;
  isSelected: boolean;
  onClick: () => void;
}

export function ResolutionCard({ option, isSelected, onClick }: ResolutionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? 'border-blue-500 shadow-md bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      } ${option.bgColor}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${option.iconColor} flex items-center justify-center`}>
          {option.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {option.title}
          </h3>
          <p className="text-sm text-gray-600">
            {option.description}
          </p>
        </div>
        {isSelected && (
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}