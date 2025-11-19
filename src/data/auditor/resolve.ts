import { ResolutionOption } from '@/interface/auditor/incident-reports/resolve';

export const resolutionOptions: ResolutionOption[] = [
  {
    id: 'confirmed_theft',
    title: 'Confirmed Theft',
    description: 'This is a verified fuel theft incident',
    icon: 'alert-circle',
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 'driver_behavior',
    title: 'Driver Behavior',
    description: 'Driver requires training or supervision',
    icon: 'user',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: 'vehicle_problem',
    title: 'Vehicle Problem',
    description: 'Vehicle needs maintenance or repair',
    icon: 'truck',
    bgColor: 'bg-yellow-50',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 'no_violation',
    title: 'No Violation',
    description: 'No wrongdoing found during review',
    icon: 'check-circle',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
];