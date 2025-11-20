// app/auditor/reports/[id]/resolve/not-found.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Case Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The case you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => router.push('/auditor/reports')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Back to Reports
        </button>
      </div>
    </div>
  );
}