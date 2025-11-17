"use client";

import React, { useState } from "react";
import { ResolveHeader } from "./header";
import { ResolutionCard } from "./resolution-card";
import { NotesSection } from "./notes-section";
import { ActionButtons } from "./action-buttons";
import { ResolutionOption } from "@/interface/auditor/incident-reports/resolve";

interface ResolvePageProps {
  caseId: string;
  options: ResolutionOption[];
}

export default function ResolvePage({ caseId, options }: ResolvePageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    console.log("Submitting resolution:", {
      caseId,
      resolution: selectedOption,
      notes,
    });
  };

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto w-full">
          {/* Header */}
          <ResolveHeader caseId={caseId} />

          {/* Resolution Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
              <ResolutionCard
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onClick={() => setSelectedOption(option.id)}
              />
            ))}
          </div>

          {/* Notes Section */}
          <NotesSection notes={notes} onChange={setNotes} />

          {/* Action Buttons */}
          <ActionButtons
            caseId={caseId}
            selectedOption={selectedOption}
            notes={notes}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
