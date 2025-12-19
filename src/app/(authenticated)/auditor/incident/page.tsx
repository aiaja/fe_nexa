import IncidentReports from '@/features/auditor/incident/incident-data';
import { IncidentsData } from '@/data/auditor/incident-reports';


function Page() {
  return (
    <IncidentReports incidentItems={IncidentsData} />
  );
}

export default Page;
