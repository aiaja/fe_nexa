"use client";

import { AnomalyDetection } from "@/interface/auditor/dashboard";

interface AnomalyDetectionChartProps {
  data: AnomalyDetection[];
}

export function AnomalyDetectionChart({ data }: AnomalyDetectionChartProps) {
  const safeData = data.length ? data : [];
  const maxValue = Math.max(...safeData.map((item) => item.value), 16);

  // Generate Y-axis labels
  const yAxisLabels = [
    maxValue,
    Math.round((maxValue * 3) / 4),
    Math.round(maxValue / 2),
    Math.round(maxValue / 4),
    0,
  ];

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Anomaly Detection
      </h3>

      {/* CHART */}
      <div className="mb-6">
        <div className="flex gap-2">
          {/* Y-AXIS LABELS */}
          <div className="flex flex-col justify-between h-64 py-2">
            {yAxisLabels.map((label, index) => (
              <span key={index} className="text-xs text-gray-500 w-8 text-right">
                {label}
              </span>
            ))}
          </div>

          {/* CHART AREA */}
          <div className="flex-1">
            <div className="relative h-64 w-full flex items-end justify-around px-6">
              {/* GRID */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 py-2">
                {yAxisLabels.map((_, index) => (
                  <div key={index} className="w-full h-px bg-gray-200"></div>
                ))}
              </div>

              {/* BARS */}
              {safeData.map((item, index) => {
                const heightPercentage =
                  maxValue > 0 ? (item.value / maxValue) * 100 : 0;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1 max-w-[100px] z-10"
                  >
                    {/* Fixed wrapper height for bars */}
                    <div className="h-60 flex items-end justify-center w-full">
                      <div
                        className="w-full max-w-[60px] rounded-t-md transition-all duration-300"
                        style={{
                          height: `${heightPercentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTTOM LABELS */}
            <div className="flex justify-around mt-3 px-6">
              {safeData.map((item, index) => (
                <div
                  key={index}
                  className="text-[9px] text-gray-600 text-center flex-1 max-w-[100px] leading-tight"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LEGEND */}
      <div className="space-y-3">
        {safeData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm px-7"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700">{item.name}</span>
            </div>

            <span className="font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}