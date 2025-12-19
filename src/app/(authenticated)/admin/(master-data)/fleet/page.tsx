"use client"

import FleetMaster from "@/features/admin/(master-data)/fleet/fleet-data"
import { fleetData } from "@/data/admin/fleet"

export default function Page() {
  return <FleetMaster fleetItems={fleetData} />
}