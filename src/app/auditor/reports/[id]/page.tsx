import ResolvePage from "@/features/auditor/reports/view-detail/page";
import { resolutionOptions } from "@/data/auditor/resolve";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Map options with case ID
  const optionsWithCaseId = resolutionOptions.map((option) => ({
    ...option,
    caseNumber: id,
  }));

  return <ResolvePage caseId={id} options={optionsWithCaseId} />;
}