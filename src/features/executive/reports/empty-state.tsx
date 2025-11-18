import React from 'react';
import { FileText } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Strategic Reports</h1>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports generated</h3>
          <p className="text-gray-500">Reports will be automatically generated on the 1st of each month.</p>
        </div>
      </div>
    </div>
  );
}