import React from 'react'
import Dashboard from '@/features/manager/Dashboard'
import { dashboardItem, anomalyItem } from '@/data/manager/dashboard'

function page() {
  return (
    <div>
      <Dashboard overviewItems={dashboardItem} anomalyItems={anomalyItem}/>
    </div>
  )
}

export default page