import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToolbarProps, View } from "react-big-calendar";
import { CalendarEvent } from "@/interface/manager/schedule";

export function CustomToolbar({
  date,
  onNavigate,
  label,
  onView,
  view,
}: ToolbarProps<CalendarEvent>) {
  const views: View[] = ["month", "week", "day", "agenda"];

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h2 className="text-xl font-semibold">{label}</h2>
      <div className="flex items-center gap-2">
        {views.map((v) => (
          <Button
            key={v}
            variant={view === v ? "default" : "outline"}
            size="sm"
            onClick={() => onView(v)}
            className={view === v ? "bg-[#0047AB] hover:bg-[#003580]" : ""}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
