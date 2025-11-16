import ResolvePage from '@/features/auditor/incidents/resolve/page';
import { resolutionOptions } from '@/data/auditor/resolve';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  console.log('Resolve Page - ID:', id); // Debug log

  return (
    <ResolvePage 
      caseId={id}
      options={resolutionOptions}
    />
  );
}