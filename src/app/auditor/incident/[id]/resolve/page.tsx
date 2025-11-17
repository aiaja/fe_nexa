import ResolvePage from '@/features/auditor/incident/resolve/page';
import { resolutionOptions } from '@/data/auditor/resolve';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  console.log('Resolve Page - ID:', id);

  return (
    <ResolvePage 
      caseId={id}
      options={resolutionOptions}
    />
  );
}
