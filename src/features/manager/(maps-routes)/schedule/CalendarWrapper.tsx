'use client';

import { useState } from 'react';
import { Calendar, SlotInfo } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '@/interface/manager/schedule';
import { MOCK_EVENTS } from '@/data/manager/schedule';
import { localizer } from '@/lib/calendar-config';
import { CustomToolbar } from './CustomToolbar';
import { EventDialog } from './EventDialog';
import { EventDetailDialog } from './DetailDialog';

export function CalendarWrapper() {
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setEditingEvent(null);
    setIsAddModalOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleSaveEvent = (eventData: {
    startTime: Date;
    endTime: Date;
    startPoint: string;
    endPoint: string;
    driverName: string;
    fleetId: string;
  }) => {
    if (editingEvent) {
      // Update existing event
      setEvents(
        events.map((evt) =>
          evt.id === editingEvent.id
            ? { ...evt, ...eventData }
            : evt
        )
      );
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        id: Math.random().toString(36).substr(2, 9),
        ...eventData,
      };
      setEvents([...events, newEvent]);
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((evt) => evt.id !== eventId));
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsDetailModalOpen(false);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedSlot(null);
    setEditingEvent(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="h-[80vh] bg-white rounded-lg border shadow-sm p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="startTime"
          endAccessor="endTime"
          defaultView="week"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          components={{
            toolbar: CustomToolbar,
          }}
          step={30}
          timeslots={2}
          className="custom-calendar cursor-pointer"
        />
      </div>

      <EventDialog
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveEvent}
        defaultDate={selectedSlot || undefined}
        editEvent={editingEvent}
      />

      <EventDetailDialog
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />
    </>
  );
}