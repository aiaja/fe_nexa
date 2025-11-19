"use client"
import FleetManagementPage from '@/features/manager/(fleet-driver)/fleet/fleet-data'
import { fleetManagementData } from '@/data/manager/fleet-management'

function page() {
  return (
    <div><FleetManagementPage fleetItems={fleetManagementData}/></div>
  )
}

export default page
