'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ActionButtonsProps {
  caseId: string;
  selectedOption: string | null;
  notes: string;
  onSubmit: () => void;
}

export function ActionButtons({ 
  caseId, 
  selectedOption, 
  notes,
  onSubmit 
}: ActionButtonsProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
      
      // Show success message
      alert('Resolution updated successfully!');
      
      // Redirect back to reports
      router.push('/auditor/reports');
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex gap-3 pt-4">
      <button
        onClick={handleCancel}
        disabled={isSubmitting}
        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        disabled={!selectedOption || isSubmitting}
        className="flex-1 px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Updating...' : 'Update Resolution'}
      </button>
    </div>
  );
}
