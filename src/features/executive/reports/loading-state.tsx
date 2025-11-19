import React from 'react';

export function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-32"></div>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-64"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-48"></div>
                </div>
              </div>
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}