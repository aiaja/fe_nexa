import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditorCardProps {
  title: string;
  desc: string;
  value: number;
  icon: LucideIcon;
  color: string;
  linkText: string;
}

export function AuditorCard({
  title,
  desc,
  value,
  icon: Icon,
  color,
  linkText,
}: AuditorCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
        <div className={`${color} bg-opacity-10 p-2 rounded-lg`}>
          <Icon className={`h-5 w-5 ${color.replace("bg-", "text-")}`} />
        </div>
      </div>

      <div className="flex items-end justify-between mt-4">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <Button variant="ghost">
          {linkText}
          <span>→</span>
        </Button>
      </div>
    </div>
  );
}
