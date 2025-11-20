export interface ReportsCard {
  title: string;
  value: string;
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