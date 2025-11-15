"use client"

import DriverMaster from "@/features/admin/(master-data)/driver/driver-data"
import { driverData } from "@/data/admin/driver"

export default function Page() {
  return <DriverMaster driverItems={driverData} />
}