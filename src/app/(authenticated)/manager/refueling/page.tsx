"use client"
import RefuelingLogbookPage from '@/features/manager/refueling/refueling-data'
import { refuelingLogbook } from '@/data/manager/refueling-logbook'

function page() {
  return (
    <div><RefuelingLogbookPage refuelingItems={refuelingLogbook}/></div>
  )
}

export default page
