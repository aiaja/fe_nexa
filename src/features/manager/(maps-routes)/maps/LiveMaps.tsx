"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { mockCheckpoints, getMockZones, getMockRoutes } from "@/data/map";

const MapVisualizer = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center content-center items-center h-screen text-xl">
      Loading Map...
    </div>
  ),
});

function LiveMaps() {
  const checkpoints = useMemo(() => mockCheckpoints, []);
  const zones = useMemo(() => getMockZones(checkpoints), [checkpoints]);
  const routes = useMemo(() => getMockRoutes(checkpoints), [checkpoints]);

  return (
    <div className="flex h-screen w-full">
      <MapVisualizer zones={zones} checkpoints={checkpoints} routes={routes} />
    </div>
  );
}

export default LiveMaps;
