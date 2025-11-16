import AuditorDashboard from '@/features/auditor/Dashboard';

import { dashboardItem, anomalyItem, fleetItem, incidentItem } from '@/data/auditor/dashboard'

function page() {
  return (
    <AuditorDashboard 
      card={dashboardItem}
      anomaly={anomalyItem}
      fleet={fleetItem}
      incident={incidentItem}
    />
  )
}

export default page