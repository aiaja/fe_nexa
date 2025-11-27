import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/interface/manager/schedule';
import { format } from 'date-fns';
import { Calendar, Clock, Tag, Trash2 } from 'lucide-react';

interface EventDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  onDelete?: (eventId: string) => void;
  onEdit?: (event: CalendarEvent) => void;
}

export function EventDetailDialog({
  isOpen,
  onClose,
  event,
  onDelete,
  onEdit,
}: EventDetailDialogProps) {
  if (!event) return null;

  const handleDelete = () => {
    if (onDelete && event.id) {
      onDelete(event.id);
      onClose();
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(event);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Task Schedule</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">
                {format(event.startTime, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm text-muted-foreground">
                {format(event.startTime, 'h:mm a')} – {format(event.endTime, 'h:mm a')}
              </p>
            </div>
          </div>

          {event.startPoint && (
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Start Point</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {event.startPoint}
                </p>
              </div>
            </div>
          )}
          {event.endPoint && (
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">End Point</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {event.endPoint}
                </p>
              </div>
            </div>
          )}
          {event.driverName && (
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Driver Name</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {event.driverName}
                </p>
              </div>
            </div>
          )}
          {event.fleetId && (
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Fleet Id</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {event.fleetId}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Event
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleEdit}
              className="flex-1 sm:flex-none"
            >
              Edit Event
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}