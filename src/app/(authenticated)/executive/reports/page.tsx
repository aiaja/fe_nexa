import StrategicReports from "@/features/executive/reports/report-data"
import { 
  reports,
  AUTO_GENERATE_SCHEDULE,
  HISTORY_FOOTER_TEXT,
  INFO_TOOLTIP_TEXT
} from "@/data/executive/report"

export default function Page() {
  return (
    <StrategicReports 
      reports={reports}
      autoGenerateSchedule={AUTO_GENERATE_SCHEDULE}
      historyFooterText={HISTORY_FOOTER_TEXT}
      infoTooltipText={INFO_TOOLTIP_TEXT}
    />
  )
}