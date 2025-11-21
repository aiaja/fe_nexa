export type ResolutionType = 
  | 'confirmed_theft'
  | 'driver_behavior'
  | 'vehicle_problem'
  | 'no_violation';

export interface ResolutionOption {
  caseNumber: string
  resolutionType: ResolutionType
  title: string
  notes: string
  icon: string
  bgColor: string
  iconBg: string
  iconColor: string
}

export interface ResolveData {
  caseId: string
  options: ResolutionOption[]
}