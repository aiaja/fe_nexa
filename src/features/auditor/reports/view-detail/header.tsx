"use client";

import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ResolveHeaderProps {
  caseId: string;
}

export function ResolveHeader({ caseId }: ResolveHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6">
      {/* Back Button and Title */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-10 w-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resolve Case</h1>
          <p className="text-sm text-gray-500 mt-1">Case {caseId}</p>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-900 font-semibold">
          Choose the most accurate resolution type based on your investigation
        </AlertTitle>
        <AlertDescription className="text-blue-700 text-sm">
          Ensure supporting data and evidence are reviewed before finalizing the
          case
        </AlertDescription>
      </Alert>
    </div>
  );
}