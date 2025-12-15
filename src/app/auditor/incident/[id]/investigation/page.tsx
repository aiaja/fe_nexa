"use client"

import { useParams } from "next/navigation"
import InvestigationPage from "@/features/auditor/incident/investigation/investigation-data"
import { investigationData } from "@/data/auditor/investigation"
import { IncidentsData } from "@/data/auditor/incident-reports"

export default function Page() {
  const { id } = useParams() as { id: string }

  const data = investigationData[id]
  const incident = IncidentsData.find(item => item.id === id)

  if (!data || !incident) {
    return (
      <div className="p-6 text-red-600">
        Data dengan ID "{id}" tidak ditemukan
      </div>
    )
  }

  return <InvestigationPage data={data} title={incident.title} />
}
