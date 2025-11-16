"use client";

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
      alert('Resolution submitted successfully!');
      
      // Redirect back to incidents list
      router.push('/auditor/incidents');
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex gap-4">
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
          {isSubmitting ? 'Submitting...' : 'Submit Resolution'}
        </button>
      </div>
    </div>
  );
}