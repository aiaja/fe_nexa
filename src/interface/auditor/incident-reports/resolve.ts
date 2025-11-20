export type ResolutionType = 
  | 'confirmed_theft'
  | 'driver_behavior'
  | 'vehicle_problem'
  | 'no_violation';

export interface ResolutionOption {
  id: ResolutionType; //id sendiri
  title: string; //ResolutionType
  description: string; //ini isi notesnya diganti jadi notes
  icon: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}

export interface ResolveData {
  caseId: string;
  options: ResolutionOption[];
}