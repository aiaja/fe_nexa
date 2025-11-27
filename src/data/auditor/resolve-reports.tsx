import { ResolutionType, ResolveData } from '@/interface/auditor/incident-reports/resolve';

export const resolutionOptionsTemplate: Omit<ResolveData["options"][number], "caseNumber" | "notes">[] = [
  {
    resolutionType: 'confirmed_theft',
    title: 'Confirmed Theft',
    icon: 'lock',
    bgColor: 'bg-red-100',
    iconBg: 'bg-red-600/10',
    iconColor: 'text-red-600',
  },
  {
    resolutionType: 'driver_behavior',
    title: 'Driver Behavior',
    icon: 'user',
    bgColor: 'bg-yellow-100',
    iconBg: 'bg-yellow-600/10',
    iconColor: 'text-yellow-600',
  },
  {
    resolutionType: 'vehicle_problem',
    title: 'Vehicle Problem',
    icon: 'truck',
    bgColor: 'bg-blue-100',
    iconBg: 'bg-blue-600/10',
    iconColor: 'text-blue-600',
  },
  {
    resolutionType: 'no_violation',
    title: 'No Violation',
    icon: 'check-circle',
    bgColor: 'bg-green-100',
    iconBg: 'bg-green-600/10',
    iconColor: 'text-green-600',
  },
];
