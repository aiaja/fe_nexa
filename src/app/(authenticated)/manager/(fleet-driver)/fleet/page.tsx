"use client"
import FleetManagementPage from '@/features/manager/(fleet-driver)/fleet/fleet-data'
import { fleetData } from "@/data/admin/fleet"

function page() {
  return (
    <div><FleetManagementPage fleetItems={fleetData}/></div>
  )
}

export default page
