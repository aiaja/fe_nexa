import { CalendarEvent } from "@/interface/manager/schedule";
import { startOfWeek, addDays, setHours, setMinutes, addHours } from 'date-fns';

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 0 });

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    scheduleId: '1',
    startTime: setMinutes(setHours(addDays(weekStart, 1), 9), 0),
    endTime: setMinutes(setHours(addDays(weekStart, 1), 11), 0),
    startPoint: 'ZONE A',
    endPoint: 'SPBU A',
    driverId: 'driver-1',
    driverName: 'John Smith',
    fleetId: 'fleet-1',
  },
  {
    scheduleId: '2',
    startTime: setMinutes(setHours(addDays(weekStart, 2), 14), 0),
    endTime: setMinutes(setHours(addDays(weekStart, 2), 16), 0),
    startPoint: 'SPBU A',
    endPoint: 'ZONE B',
    driverId: 'driver-3',
    driverName: 'Mike Chen',
    fleetId: 'fleet-2',
  },
  {
    scheduleId: '3',
    startTime: setMinutes(setHours(addDays(weekStart, 3), 10), 0),
    endTime: setMinutes(setHours(addDays(weekStart, 3), 12), 0),
    startPoint: 'ZONE B',
    endPoint: 'ZONE A',
    driverId: 'driver-2',
    driverName: 'Sarah Johnson',
    fleetId: 'fleet-1',
  },
  {
    scheduleId: '4',
    startTime: setMinutes(setHours(addDays(weekStart, 4), 8), 0),
    endTime: setMinutes(setHours(addDays(weekStart, 4), 10), 30),
    startPoint: 'ZONE A',
    endPoint: 'ZONE C',
    driverId: 'driver-5',
    driverName: 'James Wilson',
    fleetId: 'fleet-3',
  },
  {
    scheduleId: '5',
    startTime: setMinutes(setHours(addDays(weekStart, 5), 13), 0),
    endTime: setMinutes(setHours(addDays(weekStart, 5), 15), 0),
    startPoint: 'SPBU B',
    endPoint: 'ZONE A',
    driverId: 'driver-4',
    driverName: 'Emma Davis',
    fleetId: 'fleet-2',
  },
];