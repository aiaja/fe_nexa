import ReportCase from '@/features/auditor/reports/reports-data';
import { ReportData } from '@/data/auditor/reports';


function Page() {
  return (
    <ReportCase ReportsItems={ReportData} />
  );
}

export default Page;
