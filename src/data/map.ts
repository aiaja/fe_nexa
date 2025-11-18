// data/mockData.ts
// Mock Data untuk PT Freeport Indonesia

import { Checkpoint, Zone, Route } from '@/interface/map';

// 10 Checkpoints tersebar di sekitar PT Freeport
export const mockCheckpoints: Checkpoint[] = [
  { 
    id: 'cp1', 
    name: 'Main Gate Security', 
    location: { lat: -4.0550, lng: 137.1130 }, 
    zoneId: 'zone1' 
  },
  { 
    id: 'cp2', 
    name: 'Administration Building', 
    location: { lat: -4.0560, lng: 137.1140 }, 
    zoneId: 'zone1' 
  },
  { 
    id: 'cp3', 
    name: 'Warehouse Alpha', 
    location: { lat: -4.0575, lng: 137.1155 }, 
    zoneId: 'zone1' 
  },
  { 
    id: 'cp4', 
    name: 'Mining Area North', 
    location: { lat: -4.0540, lng: 137.1180 }, 
    zoneId: 'zone2' 
  },
  { 
    id: 'cp5', 
    name: 'Mining Area Center', 
    location: { lat: -4.0560, lng: 137.1190 }, 
    zoneId: 'zone2' 
  },
  { 
    id: 'cp6', 
    name: 'Processing Plant 1', 
    location: { lat: -4.0590, lng: 137.1170 }, 
    zoneId: 'zone3' 
  },
  { 
    id: 'cp7', 
    name: 'Processing Plant 2', 
    location: { lat: -4.0600, lng: 137.1180 }, 
    zoneId: 'zone3' 
  },
  { 
    id: 'cp8', 
    name: 'Storage Facility', 
    location: { lat: -4.0610, lng: 137.1165 }, 
    zoneId: 'zone3' 
  },
  { 
    id: 'cp9', 
    name: 'Logistics Hub', 
    location: { lat: -4.0580, lng: 137.1125 }, 
    zoneId: 'zone4' 
  },
  { 
    id: 'cp10', 
    name: 'East Gate Checkpoint', 
    location: { lat: -4.0570, lng: 137.1200 }, 
    zoneId: 'zone4' 
  },
];

// 4 Zona dengan relasi ke checkpoint
export const getMockZones = (checkpoints: Checkpoint[]): Zone[] => {
  const getCheckpoint = (id: string) => checkpoints.find(cp => cp.id === id)!;

  return [
    {
      id: 'zone1',
      name: 'Mining Area',
      color: 'bg-blue-500',
      checkpoints: [
        getCheckpoint('cp1'),
        getCheckpoint('cp2'),
        getCheckpoint('cp3'),
        getCheckpoint('cp9'),
      ],
    },
    {
      id: 'zone2',
      name: 'Operational Sector',
      color: '#E24A4A',
      checkpoints: [
        getCheckpoint('cp4'),
        getCheckpoint('cp5'),
        getCheckpoint('cp10'),
      ],
    },
    {
      id: 'zone3',
      name: 'Restricted',
      color: '#50C878',
      checkpoints: [
        getCheckpoint('cp6'),
        getCheckpoint('cp7'),
        getCheckpoint('cp8'),
      ],
    }
  ];
};

// 3 Rute logistik
export const getMockRoutes = (checkpoints: Checkpoint[]): Route[] => {
  const getCheckpoint = (id: string) => checkpoints.find(cp => cp.id === id)!;

  return [
    {
      id: 'route1',
      name: 'Main Supply Route',
      checkpoints: [
        getCheckpoint('cp1'),
        getCheckpoint('cp3'),
        getCheckpoint('cp6'),
        getCheckpoint('cp7'),
      ],
    },
    {
      id: 'route2',
      name: 'Mining Transport Route',
      checkpoints: [
        getCheckpoint('cp4'),
        getCheckpoint('cp6'),
        getCheckpoint('cp9'),
      ],
    },
    {
      id: 'route3',
      name: 'East Perimeter Route',
      checkpoints: [
        getCheckpoint('cp10'),
        getCheckpoint('cp7'),
        getCheckpoint('cp3'),
      ],
    },
  ];
};