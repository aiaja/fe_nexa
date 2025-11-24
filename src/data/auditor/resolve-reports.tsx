// src/data/auditor/resolve.ts
import { ResolutionType } from '@/interface/auditor/reports';

export interface ResolutionOption {
  id: ResolutionType;
  title: string;
  description: string;
  icon: string;
}

export const resolutionOptions: ResolutionOption[] = [
  {
    id: 'confirmed_theft',
    title: 'Confirmed Theft',
    description: 'The incident was confirmed as fuel theft based on investigation',
    icon: 'lock',
  },
  {
    id: 'driver_behavior',
    title: 'Driver Behavior',
    description: 'The incident was caused by driver behavior or route deviation',
    icon: 'user',
  },
  {
    id: 'fleet_issue',
    title: 'Fleet Issue',
    description: 'The incident was caused by vehicle malfunction or maintenance issue',
    icon: 'truck',
  },
  {
    id: 'no_violation',
    title: 'No Violation',
    description: 'No violation found, incident was within normal parameters',
    icon: 'check-circle',
  },
];