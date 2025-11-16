"use client";

import React from "react";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResolveHeaderProps {
  caseId: string;
}

export function ResolveHeader({ caseId }: ResolveHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          title="Go back"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Resolve Case</h1>
          <p className="text-sm text-gray-500">Case {caseId}</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            Choose the most accurate resolution type based on your investigation
          </h3>
          <p className="text-sm text-blue-700">
            Ensure supporting data and evidence are reviewed before finalizing
            the case
          </p>
        </div>
      </div>
    </div>
  );
}
