// types/index.ts
// TypeScript Interfaces untuk Aplikasi Peta PT Freeport

export type GeoJsonPoint = {
  lat: number;
  lng: number;
};

export interface Zone {
  id: string;
  name: string;
  //tambah type: Zone Type ENUM (Mining area, operational area, restricted area, fuel station)
  // coordinate : lat, lng
  color: string;
  //radius: 
  checkpoints: Checkpoint[]; //takeout
}

export interface Checkpoint {
  id: string;
  zoneId: string;
  name: string;
  //tambah radius
  location: GeoJsonPoint; //ganti ke coordinate
}

export interface Route {
  id: string;
  name: string;
  //tambah distance
  //startPoint
  //endPoint
  //estimatedTime
  checkpoints: Checkpoint[]; //ganti jadi routeCheckpoints ambil table baru
}

//RouteCheckpoint: id, routeId, checkpointId, sequence, estimatedTimeFromPrevious, distanceFromPrevious

export interface MapVisualizerProps {
  zones: Zone[];
  checkpoints: Checkpoint[];
  routes: Route[];
}