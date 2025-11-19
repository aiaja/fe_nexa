"use client"

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { mockCheckpoints, getMockZones, getMockRoutes } from '@/data/map';

const MapVisualizer = dynamic(
  () => import('@/components/Map'),
  { 
    ssr: false,
    loading: () => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading Map...
      </div>
    )
  }
);

function LiveMaps() {

   const checkpoints = useMemo(() => mockCheckpoints, []);
    const zones = useMemo(() => getMockZones(checkpoints), [checkpoints]);
    const routes = useMemo(() => getMockRoutes(checkpoints), [checkpoints]);
  
  return (
     <MapVisualizer 
        zones={zones} 
        checkpoints={checkpoints} 
        routes={routes} 
      />
  )
}

export default LiveMaps