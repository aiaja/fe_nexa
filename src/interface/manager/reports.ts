export interface ReportsCard {
  title: string;
  value: string;
}

export interface BarChart {
  caseType: string;
  case: number;
}

export interface LineChart {
  week?: string;
  month?: string;
  year?: string;
  case: number;
}
export interface ReportTable {
  id: string;
  driver_id: string;
  fleet_id: string;
  date: Date;
  name: string;
  score: number;
  total_case: number;
}