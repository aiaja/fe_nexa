'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, User, Truck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { ResolveHeader } from './header';
import { ResolutionCard } from './resolution-card';
import { NotesSection } from './notes-section';
import { ActionButtons } from './action-buttons';
import { ResolutionOption as ImportedResolutionOption } from '@/interface/auditor/incident-reports/resolve';
import { ReportCase } from '@/interface/auditor/reports';

interface ResolvePageProps {
  caseId: string;
  caseData?: ReportCase;
  options: ImportedResolutionOption[];
}

// Helper function to enhance options with UI properties
const enhanceOptions = (options: ImportedResolutionOption[]) => {
  const iconMap: Record<string, React.ReactNode> = {
    'driver_fault': <User className="w-6 h-6 text-orange-600" />,
    'vendor_fault': <Truck className="w-6 h-6 text-red-600" />,
    'no_fault': <CheckCircle className="w-6 h-6 text-green-600" />,
    'vehicle_problem': <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    'other': <AlertCircle className="w-6 h-6 text-gray-600" />,
  };

  const colorMap: Record<string, string> = {
    'driver_fault': 'hover:bg-orange-50',
    'vendor_fault': 'hover:bg-red-50',
    'no_fault': 'hover:bg-green-50',
    'vehicle_problem': 'hover:bg-yellow-50',
    'other': 'hover:bg-gray-50',
  };

  const iconBgMap: Record<string, string> = {
    'driver_fault': 'bg-orange-100',
    'vendor_fault': 'bg-red-100',
    'no_fault': 'bg-green-100',
    'vehicle_problem': 'bg-yellow-100',
    'other': 'bg-gray-100',
  };

  const iconBgColorMap: Record<string, string> = {
    'driver_fault': 'bg-orange-100',
    'vendor_fault': 'bg-red-100',
    'no_fault': 'bg-green-100',
    'vehicle_problem': 'bg-yellow-100',
    'other': 'bg-gray-100',
  };

  const iconColorMap: Record<string, string> = {
    'driver_fault': 'text-orange-600',
    'vendor_fault': 'text-red-600',
    'no_fault': 'text-green-600',
    'vehicle_problem': 'text-yellow-600',
    'other': 'text-gray-600',
  };

  const bgColorMap: Record<string, string> = {
    'driver_fault': 'hover:bg-orange-50',
    'vendor_fault': 'hover:bg-red-50',
    'no_fault': 'hover:bg-green-50',
    'vehicle_problem': 'hover:bg-yellow-50',
    'other': 'hover:bg-gray-50',
  };

  return options.map(option => ({
    ...option,
    icon: iconMap[option.id] || <AlertCircle className="w-6 h-6 text-gray-600" />,
    color: colorMap[option.id] || 'hover:bg-gray-50',
    iconBg: iconBgMap[option.id] || 'bg-gray-100',
    iconBgColor: iconBgColorMap[option.id] || 'bg-gray-100',
    iconColor: iconColorMap[option.id] || 'text-gray-600',
    bgColor: bgColorMap[option.id] || 'hover:bg-gray-50',
  }));
};

export default function ResolvePage({ caseId, caseData, options }: ResolvePageProps) {
  const router = useRouter();
  
  // Check if data is available
  if (!caseId || !options || options.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Case Not Found</h2>
            <p className="text-gray-600 mb-6">
              The case you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.push('/auditor/reports')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enhance options with UI properties
  const enhancedOptions = useMemo(() => enhanceOptions(options), [options]);
  
  const [selectedResolution, setSelectedResolution] = useState<string>(
    caseData?.resolution || enhancedOptions[0]?.id || ''
  );
  
  const [notes, setNotes] = useState(caseData?.notes || '');

  const handleSave = async () => {
    try {
      console.log('Saving resolution:', { caseId, selectedResolution, notes });
      
      // TODO: Replace with actual API call
      // await updateCaseResolution(caseId, { resolution: selectedResolution, notes });
      
      router.push('/auditor/reports');
    } catch (error) {
      console.error('Error saving resolution:', error);
      // TODO: Show error toast
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ResolveHeader caseId={caseId} caseData={caseData} onBack={handleCancel} />
      
      {/* Resolution Cards Grid */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Resolution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enhancedOptions.map((option) => (
            <ResolutionCard
              key={option.id}
              option={option}
              isSelected={selectedResolution === option.id}
              onClick={() => setSelectedResolution(option.id)}
            />
          ))}
        </div>
      </div>

      <NotesSection notes={notes} onChange={setNotes} />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ActionButtons
          caseId={caseId}
          selectedOption={selectedResolution}
          notes={notes}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}