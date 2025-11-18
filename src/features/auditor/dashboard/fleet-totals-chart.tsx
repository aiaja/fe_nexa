"use client";

import { FleetTotal } from "@/interface/auditor/dashboard";
import React, { useState } from "react";

interface FleetTotalsChartProps {
  data: FleetTotal[];
}

export function FleetTotalChart({ data }: FleetTotalsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Kalkulasi
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const totalPercent = data.reduce((sum, item) => sum + item.percent, 0);
  const scaleFactor = totalPercent > 0 ? 100 / totalPercent : 0;

  let cumulativePercent = 0;
  const segmentPositions = data.map((item) => {
    const adjustedPercent = item.percent * scaleFactor;
    const start = cumulativePercent;
    cumulativePercent += adjustedPercent;
    return { start, end: cumulativePercent, originalPercent: item.percent };
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      {/* Judul dan Angka Total */}
      <div className="mb-6 mx-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          Fleet Totals
        </h3>
        <div className="text-4xl font-bold text-gray-900">{totalValue}</div>
        <p className="text-xs text-gray-500">Total Vehicles at Fleet</p>
      </div>

      {/* Wrapper untuk Chart dan Legenda */}
      <div className="flex items-center gap-8 py-8 mx-4">
        {/* Pie Chart (Solid - tidak bolong) */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const { start, end, originalPercent } = segmentPositions[index];
              const startAngle = (start / 100) * 360 - 90;
              const endAngle = (end / 100) * 360 - 90;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const radius = 90;
              const x1 = 100 + radius * Math.cos(startRad);
              const y1 = 100 + radius * Math.sin(startRad);
              const x2 = 100 + radius * Math.cos(endRad);
              const y2 = 100 + radius * Math.sin(endRad);
              const largeArc = originalPercent * scaleFactor > 50 ? 1 : 0;

              return (
                <g key={index}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    className="transition-opacity cursor-pointer"
                    fill={item.color}
                    opacity={
                      hoveredIndex === null || hoveredIndex === index ? 1 : 0.3
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {hoveredIndex === index && (
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm font-semibold fill-gray-700"
                    >
                      {item.percent}%
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend (Legenda) */}
        <div className="space-y-3 flex-1 max-w-xs">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer transition-opacity"
              style={{
                opacity:
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Wrapper untuk titik warna dan teks */}
              <div className="flex items-center gap-2 flex-auto">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>

              {/* Angka (rata kanan) */}
              <span className="text-sm font-semibold text-gray-900 flex-shrink-0 w-8 text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}