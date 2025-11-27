import { reportItem } from "@/data/manager/reports"
import ReportPage from "@/features/manager/reports/ReportPage"

function page() {
  return (
    <div><ReportPage reportItems={reportItem}/></div>
  )
}

export default page
