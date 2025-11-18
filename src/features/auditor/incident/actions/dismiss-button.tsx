"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from 'lucide-react';

interface DismissButtonProps {
  incidentId: string;
  incidentTitle?: string;
  onClick?: (id: string) => void;
  onDismissed?: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
}

export function DismissButton({
  incidentId,
  incidentTitle,
  onClick,
  onDismissed,
  fullWidth = false,
  className = "",
}: DismissButtonProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  const handleInitialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAlert(true);
  };

  const handleConfirmDismiss = async () => {
    if (onClick) {
      onClick(incidentId);
    }

    setIsDismissing(true);

    // Simulate API call
    setTimeout(() => {
      setIsDismissing(false);
      setShowAlert(false);

      if (onDismissed) {
        onDismissed(incidentId);
      }

      // Show success notification
      alert("Incident dismissed successfully");
    }, 500);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  const baseClasses =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors border";
  const widthClass = fullWidth ? "w-full" : "";

  const isIconOnly = className?.includes("w-10");

  return (
    <>
      <button
        onClick={handleInitialClick}
        className={`${isIconOnly ? "p-0 rounded border-0 text-gray-400 hover:text-gray-600" : `${baseClasses} ${widthClass}`} ${className} ${!isIconOnly ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-50" : ""}`}
        title={isIconOnly ? "Dismiss incident" : undefined}
      >
        {isIconOnly ? (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.5 1.5H5.75A2.75 2.75 0 003 4.25v11A2.75 2.75 0 005.75 18h8.5A2.75 2.75 0 0017 15.25v-8.5m-5.25-5v5m0 0H8m4 0h4M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ) : (
          "Dismiss"
        )}
      </button>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400/25">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            {/* Alert Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Dismiss Incident?
                </h3>
                <p className="text-sm text-gray-600">
                  Are you sure you want to dismiss this incident? This action
                  cannot be undone.
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                aria-label="Close dialog"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Incident Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Case ID</p>
              <p className="text-sm font-medium text-gray-900 mb-2">
                {incidentId}
              </p>
              {incidentTitle && (
                <>
                  <p className="text-xs text-gray-500 mb-1">Title</p>
                  <p className="text-sm text-gray-900">{incidentTitle}</p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isDismissing}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDismiss}
                disabled={isDismissing}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDismissing ? "Dismissing..." : "Yes, Dismiss"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
