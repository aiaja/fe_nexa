"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface InvestigateButtonProps {
  incidentId: string;
  onClick?: (id: string) => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
}

export function InvestigateButton({ 
  incidentId, 
  onClick,
  variant = 'primary',
  fullWidth = false,
  className = ''
}: InvestigateButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(incidentId);
    } else {
      // Navigate to investigation page
      router.push(`/auditor/incident/${incidentId}/investigation`);
    }
  };

  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-700" 
    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
    >
      Investigate
    </button>
  );
}
