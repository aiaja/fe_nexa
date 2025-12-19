"use client"

import DriverManagementPage from '@/features/manager/(fleet-driver)/driver/driver-data'
import { driverData } from "@/data/admin/driver"

function page() {
  return (
    <div><DriverManagementPage driverItems={driverData}/></div>
  )
}

export default page
