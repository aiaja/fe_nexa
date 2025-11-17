"use client";

import React from 'react';
import { MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { RouteTimelineEvent } from '@/interface/auditor/incident-reports/investigation';

interface RouteTimelineProps {
  events: RouteTimelineEvent[];
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'depot':
      return <MapPin className="w-5 h-5" />;
    case 'checkpoint':
      return <CheckCircle className="w-5 h-5" />;
    case 'anomaly':
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return <MapPin className="w-5 h-5" />;
  }
};

const getEventBgColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'bg-green-50';
    case 'warning':
      return 'bg-yellow-50';
    case 'critical':
      return 'bg-red-50';
    default:
      return 'bg-gray-50';
  }
};

const getEventBorderColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'border-green-200';
    case 'warning':
      return 'border-yellow-200';
    case 'critical':
      return 'border-red-200';
    default:
      return 'border-gray-200';
  }
};

const getIconBgColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'bg-green-100 text-green-600';
    case 'warning':
      return 'bg-yellow-100 text-yellow-600';
    case 'critical':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getLineColor = (status: string) => {
  switch (status) {
    case 'normal':
      return 'border-green-300';
    case 'warning':
      return 'border-yellow-300';
    case 'critical':
      return 'border-red-300';
    default:
      return 'border-gray-300';
  }
};

export function RouteTimeline({ events }: RouteTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-6">Route Timeline</h2>
      
      <div className="space-y-0">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          const tankPercentage = (event.tankLevel / event.tankCapacity) * 100;

          return (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${getIconBgColor(event.status)} flex items-center justify-center flex-shrink-0`}>
                  {getEventIcon(event.type)}
                </div>
                {!isLast && (
                  <div className={`w-0.5 h-full min-h-[60px] border-l-2 ${getLineColor(event.status)} my-2`} />
                )}
              </div>

              {/* Event Content */}
              <div className={`flex-1 pb-8 ${!isLast ? 'border-b-0' : ''}`}>
                <div className={`p-4 rounded-lg border ${getEventBgColor(event.status)} ${getEventBorderColor(event.status)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {event.time}
                      </p>
                      <p className="text-sm text-gray-900 font-medium">{event.location}</p>
                      {event.type === 'anomaly' && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                          ANOMALY
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        Tank : {Math.round(tankPercentage)}%
                      </p>
                      <p className="text-xs text-gray-500">{event.tankLevel}L</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <ul className="space-y-1 mt-3">
                    {event.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
