export interface Report {
  id: string
  title: string
  month: string
  year: number
  generatedDate: string
  isLatest?: boolean
  includes?: string[]
  fileSize?: string
  format?: string
  totalPages?: number
  dataPoints?: number
  chartsIncluded?: number
}

export interface ReportInclude {
  label: string
  icon?: string
}

export interface ReportBriefStats {
  totalPages: number
  dataPoints: number
  chartsIncluded: number
}