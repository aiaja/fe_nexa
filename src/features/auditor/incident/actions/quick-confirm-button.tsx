"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuickConfirmButtonProps {
  incidentId: string;
  onClick?: (id: string) => void;
  onConfirmed?: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
}

export function QuickConfirmButton({ 
  incidentId, 
  onClick,
  onConfirmed,
  fullWidth = false,
  className = ''
}: QuickConfirmButtonProps) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      onClick(incidentId);
    }

    setIsConfirming(true);

    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      
      if (onConfirmed) {
        onConfirmed(incidentId);
      }

      // Navigate to resolve page
      router.push(`/auditor/incidents/${incidentId}/resolve`);
    }, 500);
  };

  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-colors border";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={handleClick}
      disabled={isConfirming}
      className={`${baseClasses} ${widthClass} ${className} bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isConfirming ? 'Processing...' : 'Quick Confirm'}
    </button>
  );
}