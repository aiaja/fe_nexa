"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseSummary as CaseSummaryType, IncidentSaverity } from "@/interface/auditor/incident-reports/investigation";

interface CaseSummaryProps {
  summary: CaseSummaryType;
}

const severityColor: Record<IncidentSaverity, string> = {
  CRITICAL: "bg-red-600 text-white",
  HIGH: "bg-orange-500 text-white",
  MEDIUM: "bg-yellow-500 text-white",
};

export function CaseSummary({ summary }: CaseSummaryProps) {
  const router = useRouter();

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Kembali"
          className="p-2 hover:bg-muted rounded-lg"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div>
          <CardTitle className="text-xl">
            {summary.caseNumber} — Under Investigation
          </CardTitle>
          <p className="text-sm text-muted-foreground">{summary.type}</p>
        </div>
      </CardHeader>

      <CardContent>
        <h2 className="text-base font-semibold mb-4">Case Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Case Number</p>
            <p className="text-sm font-medium">{summary.caseNumber}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Type</p>
            <p className="text-sm font-medium">{summary.type}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Fleet ID</p>
            <p className="text-sm font-medium">{summary.fleetId}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Driver ID</p>
            <p className="text-sm font-medium">{summary.driverId}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Date</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{summary.date}</p>

              <Badge
                className={`${severityColor[summary.severity]} text-xs px-2 py-1`}
              >
                {summary.severity}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
