export interface Report {
  id: string
  title: string
  month: string
  year: number
  generatedDate: string //generatedAt
  isLatest?: boolean
  includes?: string[] //
  fileSize?: string 
  format?: string 
  totalPages?: number
  dataPoints?: number //takeout
  chartsIncluded?: number //takeout
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