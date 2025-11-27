import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarEvent, EventFormData } from '@/interface/manager/schedule';
import { DriverData } from '@/interface/admin/driver';
import { FleetData } from '@/interface/admin/fleet';

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: {
    startTime: Date;
  endTime: Date;
  startPoint: string;
  endPoint: string;
  driverId?: string;
  driverName: string;
  fleetId: string;
  }) => void;
  defaultDate?: { start: Date; end: Date };
  editEvent?: CalendarEvent | null;
}

export function EventDialog({
  isOpen,
  onClose,
  onSave,
  defaultDate,
  editEvent,
}: EventDialogProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [driverName, setDriverName] = useState('');
  const [fleetId, setFleetId] = useState('');
  

  useEffect(() => {
    if (editEvent) {
        setStartTime(format(editEvent.startTime, "yyyy-MM-dd'T'HH:mm"));
        setEndTime(format(editEvent.endTime, "yyyy-MM-dd'T'HH:mm"));
        setStartPoint(editEvent.startPoint);
        setEndPoint(editEvent.endPoint);
        setDriverName(editEvent.driverName);
        setFleetId(editEvent.fleetId);
    } else if (defaultDate) {
      setStartTime(format(defaultDate.start, "yyyy-MM-dd'T'HH:mm"));
      setEndTime(format(defaultDate.end, "yyyy-MM-dd'T'HH:mm"));
    }
  }, [defaultDate, editEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startTime || !endTime) return;

    onSave({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      startPoint: startPoint,
      endPoint: endPoint,
      driverName: driverName,
      fleetId: fleetId,
    });

    // Reset form
    setStartTime('')
    setEndTime('')
    setStartPoint('')
    setEndPoint('')
    setDriverName('')
    setFleetId('')
    onClose();
  };

  const handleClose = () => {
    setStartTime('')
    setEndTime('')
    setStartPoint('')
    setEndPoint('')
    setDriverName('')
    setFleetId('')
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editEvent ? 'Edit Schedule' : 'Add New Schedule'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start">Start Time *</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end">End Time *</Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startPoint">Start Point *</Label>
                <Input
                  id="startPoint"
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endPoint">End Point *</Label>
                <Input
                  id="end"
                  type="text"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="driverName">Driver Name *</Label>
                <Input
                  id="driverName"
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fleetId">Fleet ID *</Label>
                <Input
                  id="fleetId"
                  type="text"
                  value={fleetId}
                  onChange={(e) => setFleetId(e.target.value)}
                  required
                />
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editEvent ? 'Update Event' : 'Save Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}