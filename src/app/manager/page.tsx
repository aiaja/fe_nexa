import React from 'react'
import Dashboard from '@/features/manager/Dashboard'
import { dashboardItem, anomalyItem } from '@/data/manager/dashboard'
import { MOCK_EVENTS } from '@/data/manager/schedule'

function page() {
  return (
    <div>
      <Dashboard overviewItems={dashboardItem} anomalyItems={anomalyItem} scheduleItems={MOCK_EVENTS}/>
    </div>
  )
}

export default page