"use client"

import { useParams } from 'next/navigation'
import DriverDetail from '@/features/admin/(master-data)/driver/detail-page/driver-detail'
import { driverData } from '@/data/admin/driver'

export default function Page() {
  const params = useParams()
  const driverId = params.id as string

  const driver = driverData.find(f => f.id === driverId)

  return <DriverDetail driver={driver || null} />
}