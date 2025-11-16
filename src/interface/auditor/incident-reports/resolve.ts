export type ResolutionType = 
  | 'confirmed_theft'
  | 'driver_behavior'
  | 'vehicle_problem'
  | 'no_violation';

export interface ResolutionOption {
  id: ResolutionType;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}

export interface ResolveData {
  caseId: string;
  options: ResolutionOption[];
}