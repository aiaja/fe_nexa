"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner"; 
import { ResolveHeader } from "./header";
import { ResolutionCard } from "./resolution-card";
import { NotesSection } from "./notes-section";
import { ActionButtons } from "./action-buttons";
import type { ResolutionOption } from "@/interface/auditor/incident-reports/resolve";

interface ResolvePageProps {
  caseId: string;
  options: ResolutionOption[];
}

export default function ResolvePage({ caseId, options }: ResolvePageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!selectedOption) {
      toast.error("Please select a resolution option.", {
        description: "You must choose how to resolve the incident before submitting."
      });
      return;
    }

    const loadingToastId = toast.loading(`Submitting resolution for Case ID: ${caseId}...`);
    setIsSubmitting(true);

    try {
      console.log("Submitting resolution:", {
        caseId,
        resolution: selectedOption,
        notes,
      });

      await new Promise(resolve => setTimeout(resolve, 1500)); 

      toast.dismiss(loadingToastId);

      toast.success("Incident Resolved Successfully!", {
        description: `Case ID ${caseId} has been resolved as: ${selectedOption}.`,
      });

    } catch (error) {
      console.error("Submission failed:", error);

      toast.dismiss(loadingToastId);

      toast.error("Failed to Resolve Incident", {
        description: "An error occurred during submission. Please check the logs.",
      });

    } finally {
      setIsSubmitting(false);
    }
  }, [caseId, selectedOption, notes]);
  
  const isSubmitDisabled = !selectedOption || isSubmitting;

  return (
    <div className="flex flex-1 flex-col bg-gray-50 min-h-screen">
      <div className="w-full h-full">
        <ResolveHeader caseId={caseId} />
        
        {/* Resolution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {options.map((option) => (
            <ResolutionCard
              key={option.resolutionType}
              option={option}
              isSelected={selectedOption === option.resolutionType}
              onClick={() => setSelectedOption(option.resolutionType)}
            />
          ))}
        </div>

        <div className="mb-6">
          <NotesSection notes={notes} onChange={setNotes} />
        </div>

        <ActionButtons
          caseId={caseId}
          
          isSubmitting={isSubmitting}
          isSubmitDisabled={isSubmitDisabled}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
