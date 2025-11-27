"use client";

import ReportTablePage from "./report-data";
import { reportTable } from "@/data/manager/reports";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReportsCard } from "@/interface/manager/reports";
import { FilterPopover, FilterValues } from "./filter-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Search } from "lucide-react";
import { ReportChartLine } from "./ReportChartLine";
import { ReportChartBar } from "./ReportChartBar";
import { Input } from "@/components/ui/input";

interface ReportProps {
  reportItems: ReportsCard[];
}

function ReportPage({ reportItems }: ReportProps) {
  const [filters, setFilters] = useState<FilterValues>({
    statuses: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        </div>

        <div className="flex justify-between">
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
          <div className="flex flex-wrap items-center gap-4">
            Filter by :
            <FilterPopover onApply={setFilters} currentFilters={filters} />
            <Button>
              <DownloadIcon />
              Download
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {reportItems.map((item) => {
            return (
              <Card className="gap-0 h-fit" key={item.title}>
                <CardHeader className="text-base font-semibold">
                  {item.title}
                </CardHeader>
                <CardContent className="text-3xl font-semibold">
                  {item.value}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ReportChartLine />
          <ReportChartBar />
        </div>
        <div>
          <ReportTablePage reportItems={reportTable} />
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
