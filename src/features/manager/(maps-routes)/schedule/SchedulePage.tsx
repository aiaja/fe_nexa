"use client"

import { CalendarWrapper } from "./CalendarWrapper";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SchedulePage() {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Delivery Schedule</h1>
        </div>

          <div className="relative flex-1 max-w-64">
            <Input
              type="text"
              placeholder="Search Report"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus-visible:ring-0 focus-visible:border-[#0047AB]"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
      
      <CalendarWrapper />
      </div>
    </div>
  );
}