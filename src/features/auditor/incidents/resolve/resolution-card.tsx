"use client";

import React from 'react';
import { AlertCircle, User, Truck, CheckCircle } from 'lucide-react';
import { ResolutionOption } from '@/interface/auditor/incident-reports/resolve';

interface ResolutionCardProps {
  option: ResolutionOption;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap = {
  'alert-circle': AlertCircle,
  'user': User,
  'truck': Truck,
  'check-circle': CheckCircle
};

export function ResolutionCard({ option, isSelected, onClick }: ResolutionCardProps) {
  const Icon = iconMap[option.icon as keyof typeof iconMap] || AlertCircle;

  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? 'border-blue-500 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      } ${option.bgColor}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${option.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${option.iconColor}`} />
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