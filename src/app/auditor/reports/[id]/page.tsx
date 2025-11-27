// app/auditor/reports/[id]/resolve/page.tsx
import { notFound } from "next/navigation";
import ResolvePage from "@/features/auditor/incident/reports/resolve/page";
import { resolutionOptions } from "@/data/auditor/resolve";
import { getCaseById } from "@/data/auditor/reports";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Get case data
  const caseData = getCaseById(id);

  // Handle case not found
  if (!caseData) {
    notFound();
  }

  return (
    <ResolvePage caseId={id} caseData={caseData} options={resolutionOptions} />
  );
}
