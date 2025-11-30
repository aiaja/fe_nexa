"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes: string;
  onChange: (notes: string) => void;
}

export function NotesSection({ notes, onChange }: NotesSectionProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <Label className="text-base font-semibold text-gray-900">
          Add Notes (Optional)
        </Label>
      </div>

      <Textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example : GPS data shows driver stopped at authorized fuel station. Receipt matches fuel amount. All sensors functioning normally."
        rows={6}
        className="w-full resize-none"
      />
    </Card>
  );
}