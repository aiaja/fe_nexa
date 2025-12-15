"use client"

import { useParams } from 'next/navigation'
import IncidentDetail from '@/features/auditor/incident/view-detail/incident-detail'
import { IncidentsData } from '@/data/auditor/incident-reports'

export default function Page() {
  const params = useParams()
  const caseNumber = params.id as string

  const incident = IncidentsData.find(f => f.id === caseNumber)

  return <IncidentDetail incident={incident || null} />
}