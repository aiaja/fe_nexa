import { InvestigationData } from '@/interface/auditor/incident-reports/investigation';

export const investigationData: Record<string, InvestigationData> = {
  'A-2024-0847': {
    summary: {
      caseId: 'A-2024-0847',
      type: 'Fuel Theft',
      fleet: 'F-001',
      driver: 'D-001',
      date: '06 Nov 2024, 14:32 WIB',
      severity: 'CRITICAL'
    },
    timeline: [
      {
        id: '1',
        time: '13:00',
        location: 'Depot A',
        type: 'depot',
        status: 'normal',
        tankLevel: 180,
        tankCapacity: 180,
        details: [
          'Refueled: 140L',
          'Tank: 95% (180L)'
        ]
      },
      {
        id: '2',
        time: '13:45',
        location: 'Checkpoint 1 (Route A)',
        type: 'checkpoint',
        status: 'normal',
        tankLevel: 135,
        tankCapacity: 180,
        details: [
          'Tank: 88% (135L) - Normal',
          'Speed: 65 km/h'
        ]
      },
      {
        id: '3',
        time: '14:20',
        location: 'Anomaly Location (Route KM 57)',
        type: 'anomaly',
        status: 'critical',
        tankLevel: 75,
        tankCapacity: 180,
        details: [
          'GPS Signal Lost: 12 minutes',
          'Last known: Fuel station vicinity',
          'Suspected unauthorized stop',
          'Tank AFTER: 48% (75L) - Missing 45L'
        ]
      }
    ]
  }
};