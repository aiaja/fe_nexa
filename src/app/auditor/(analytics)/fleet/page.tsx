import FleetAnalytics from '@/features/auditor/(analytics)/fleet/fleet-analytics-data';
import { FleetAnalyticsData } from '@/data/auditor/fleet-analytics';


function Page() {
  return (
    <FleetAnalytics FleetAnalyticsItems={FleetAnalyticsData} />
  );
}

export default Page;
