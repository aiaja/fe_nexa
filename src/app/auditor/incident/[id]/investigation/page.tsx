import InvestigationPage from '@/features/auditor/incidents/investigation/page';
import { investigationData } from '@/data/auditor/investigation';
import { incidentReports } from '@/data/auditor/incident-reports';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  
  // Get investigation data
  const data = investigationData[id];
  
  // Get incident title
  const incident = incidentReports.find(inc => inc.id === id);
  
  if (!data || !incident) {
    notFound();
  }

  return (
    <InvestigationPage 
      data={data} 
      title={incident.title}
    />
  );
}