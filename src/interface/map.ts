// types/index.ts
// TypeScript Interfaces untuk Aplikasi Peta PT Freeport

export type GeoJsonPoint = {
  lat: number;
  lng: number;
};

export interface Checkpoint {
  id: string;
  name: string;
  location: GeoJsonPoint;
  zoneId: string;
}

export interface Zone {
  id: string;
  name: string;
  color: string;
  checkpoints: Checkpoint[];
}

export interface Route {
  id: string;
  name: string;
  checkpoints: Checkpoint[];
}

export interface MapVisualizerProps {
  zones: Zone[];
  checkpoints: Checkpoint[];
  routes: Route[];
}