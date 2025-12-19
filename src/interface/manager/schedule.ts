export interface CalendarEvent {
  id: string;
  startTime: Date;
  endTime: Date;
  startPoint: string;
  endPoint: string;
  driverId?: string;
  driverName: string;
  fleetId: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  selectedEvent?: CalendarEvent;
}

export interface ScheduleData {
  scheduleId: string;
  startTime: Date;
  endTime: Date;
  startPoint: string;
  endPoint: string;
  driverId?: string;
  driverName: string;
  fleetId: string;
}