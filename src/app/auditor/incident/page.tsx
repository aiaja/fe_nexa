import IncidentReports from '@/features/auditor/incident/page';
import { incidentReports } from '@/data/auditor/incident-reports';


function Page() {
  return (
    <IncidentReports incidents={incidentReports} />
  );
}

export default Page;
