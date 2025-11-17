"use client";

import React from 'react';

interface NotesSectionProps {
  notes: string;
  onChange: (notes: string) => void;
}

export function NotesSection({ notes, onChange }: NotesSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Add Notes (Optional)
      </h2>
      
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example : GPS data shows driver stopped at authorized fuel station. Receipt matches fuel amount. All sensors functioning normally."
        rows={6}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
      />
      
      <p className="mt-2 text-xs text-gray-500">
        Provide additional context or evidence to support your resolution decision
      </p>
    </div>
  );
}