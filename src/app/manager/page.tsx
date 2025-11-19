import React from 'react'
import Dashboard from '@/features/manager/Dashboard'
import { dashboardItem, anomalyItem } from '@/data/manager/dashboard'
import { fleetManagementData } from '@/data/manager/fleet-management'

function page() {
  return (
    <div>
      <Dashboard overviewItems={dashboardItem} anomalyItems={anomalyItem} fleetItems={fleetManagementData}/>
    </div>
  )
}

export default page