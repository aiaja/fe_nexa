"use client"

import DriverManagementPage from '@/features/manager/(fleet-driver)/driver/fleet-data'
import { driverManagementData } from '@/data/manager/driver-management'

function page() {
  return (
    <div><DriverManagementPage driverItems={driverManagementData}/></div>
  )
}

export default page
