import { Report } from "@/interface/executive/report"

export const reports: Report[] = [
  {
    id: '1',
    title: 'October 2024 Executive Report',
    month: 'October',
    year: 2024,
    generatedAt: 'Nov 01, 2024 00:00',
    isLatest: true,
    includes: [
      'Fuel Consumption Summary',
      'Top Performing Trucks',
      'Critical Alerts & Incidents',
      'Efficiency Metrics',
      'Recommendations'
    ],
    fileSize: '2.8 MB',
    format: 'PDF',
    totalPages: 24,
  },
  {
    id: '2',
    title: 'September 2024 Executive Report',
    month: 'September',
    year: 2024,
    generatedAt: 'October 01, 2024',
    fileSize: '2.6 MB',
    format: 'PDF'
  },
  {
    id: '3',
    title: 'August 2024 Executive Report',
    month: 'August',
    year: 2024,
    generatedAt: 'September 01, 2024',
    fileSize: '2.4 MB',
    format: 'PDF'
  },
  {
    id: '4',
    title: 'July 2024 Executive Report',
    month: 'July',
    year: 2024,
    generatedAt: 'August 01, 2024',
    fileSize: '2.7 MB',
    format: 'PDF'
  },
  {
    id: '5',
    title: 'June 2024 Executive Report',
    month: 'June',
    year: 2024,
    generatedAt: 'July 01, 2024',
    fileSize: '2.5 MB',
    format: 'PDF'
  },
  {
    id: '6',
    title: 'May 2024 Executive Report',
    month: 'May',
    year: 2024,
    generatedAt: 'June 01, 2024',
    fileSize: '2.3 MB',
    format: 'PDF'
  },
  {
    id: '7',
    title: 'April 2024 Executive Report',
    month: 'April',
    year: 2024,
    generatedAt: 'May 01, 2024',
    fileSize: '2.4 MB',
    format: 'PDF'
  }
]

// Konstanta untuk auto-generate schedule
export const AUTO_GENERATE_SCHEDULE = '1st of each month'

// Konstanta untuk history footer text
export const HISTORY_FOOTER_TEXT = 'Showing last 6 months • Reports older than 12 months are archived automatically'

// Tooltip text untuk info icon
export const INFO_TOOLTIP_TEXT = 'Reports are automatically generated on the 1st of each month at midnight. Each report includes comprehensive fleet performance data, fuel consumption analysis, and actionable recommendations.'