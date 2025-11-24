export interface Report {
  id: string
  title: string
  month: string
  year: number
  generatedAt: string
  isLatest?: boolean
  includes?: string[] //
  fileSize?: string 
  format?: string 
  totalPages?: number
}

export interface ReportInclude {
  label: string
  icon?: string
}
