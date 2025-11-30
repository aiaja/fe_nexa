export type FleetStatus =
| "ACTIVE"
| "UNDER WATCH"
| "MONITORING"
| "INACTIVE"

export interface FleetAnalytics {
  id: string
  fleetId: string
  make: string
  model: string
  issues: number
  status: FleetStatus
}


