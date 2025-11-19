// components/MapVisualizer.tsx
"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapVisualizerProps } from "@/interface/map";

// Fix untuk icon marker Leaflet di Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

const MapVisualizer: React.FC<MapVisualizerProps> = ({
  zones,
  checkpoints,
  routes,
}) => {
  const center: [number, number] = [-4.057045709306985, 137.11516964212353];

  return (
    <div style={{ width: "100%"}} className="border rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render Zona (Polygon) */}
        {zones.map((zone) => {
          const positions: [number, number][] = zone.checkpoints.map((cp) => [
            cp.location.lat,
            cp.location.lng,
          ]);

          return (
            <Polygon
              key={zone.id}
              positions={positions}
              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.2,
                weight: 2,
              }}
            >
              <Popup>
                <div>
                  <strong>{zone.name}</strong>
                  <br />
                  Checkpoints: {zone.checkpoints.length}
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* Render Rute (Polyline) */}
        {routes.map((route) => {
          const positions: [number, number][] = route.checkpoints.map((cp) => [
            cp.location.lat,
            cp.location.lng,
          ]);

          return (
            <Polyline
              key={route.id}
              positions={positions}
              pathOptions={{
                color: "#FF6B35",
                weight: 4,
                opacity: 0.8,
                dashArray: "10, 5",
              }}
            >
              <Popup>
                <div>
                  <strong>{route.name}</strong>
                  <br />
                  Checkpoints:{" "}
                  {route.checkpoints.map((cp) => cp.name).join(" → ")}
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Render Checkpoint (Marker) */}
        {checkpoints.map((checkpoint) => (
          <Marker
            key={checkpoint.id}
            position={[checkpoint.location.lat, checkpoint.location.lng]}
          >
            <Popup>
              <div>
                <strong>{checkpoint.name}</strong>
                <br />
                Lat: {checkpoint.location.lat.toFixed(6)}
                <br />
                Lng: {checkpoint.location.lng.toFixed(6)}
              </div>
            </Popup>
          </Marker>
        ))}
        {/* Legend */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            maxWidth: "250px",
          }}
        >
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Legenda
          </h3>
          <div style={{ fontSize: "12px" }}>
            <div style={{ marginBottom: "8px" }}>
              <strong>Zona:</strong>
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  style={{ marginLeft: "10px", marginTop: "4px" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      backgroundColor: zone.color,
                      marginRight: "5px",
                      border: "1px solid #666",
                    }}
                  ></span>
                  {zone.name}
                </div>
              ))}
            </div>
            <div>
              <strong>Rute:</strong>
              <div style={{ marginLeft: "10px", marginTop: "4px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "3px",
                    backgroundColor: "#FF6B35",
                    marginRight: "5px",
                  }}
                ></span>
                Jalur Logistik
              </div>
            </div>
          </div>
        </div>
      </MapContainer>
    </div>
  );
};

export default MapVisualizer;
