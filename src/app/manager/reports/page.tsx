"use client"
import ReportTablePage from '@/features/manager/reports/report-data'
import { reportTable } from '@/data/manager/reports'

function page() {
  return (
    <div><ReportTablePage reportItems={reportTable}/></div>
  )
}

export default page
