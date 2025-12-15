import FleetDetailPage from "@/features/auditor/(analytics)/fleet/view-detail/page";
import { getFleetDetailById } from "@/data/auditor/fleet-analytics";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const fleet = getFleetDetailById(id);

  if (!fleet) {
    notFound();
  }

  return <FleetDetailPage fleet={fleet} />;
}