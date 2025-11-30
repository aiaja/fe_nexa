import DriverAnalytics from '@/features/auditor/(analytics)/driver/driver-analytics-data';
import { DriverAnalyticsData } from '@/data/auditor/driver-analytics';


function Page() {
  return (
    <DriverAnalytics DriverAnalyticsItems={DriverAnalyticsData} />
  );
}

export default Page;
