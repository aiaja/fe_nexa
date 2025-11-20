export interface FleetAnalyticsData {
  id: string
  fleetId: string
  make: string
  model: string
  issues: number
  status: 'Normal' | 'Monitoring' | 'Under Watch' | 'Maintenance'
  lastIncident?: string
  riskScore?: number
}
