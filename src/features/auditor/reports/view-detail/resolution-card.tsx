"use client";

import React from "react";
import { Lock, User, Truck, CheckCircle } from "lucide-react";
import { ResolutionOption } from "@/interface/auditor/incident-reports/resolve";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResolutionCardProps {
  option: ResolutionOption;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap = {
  lock: Lock,
  user: User,
  truck: Truck,
  "check-circle": CheckCircle,
};

export function ResolutionCard({
  option,
  isSelected,
  onClick,
}: ResolutionCardProps) {
  const Icon = iconMap[option.icon as keyof typeof iconMap] || CheckCircle;

  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-6 cursor-pointer transition-all duration-200 border-2",
        isSelected
          ? "border-blue-500 shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
        option.bgColor
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
            option.iconBg
          )}
        >
          <Icon className={cn("w-6 h-6", option.iconColor)} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {option.title}
          </h3>
          <p className="text-sm text-gray-600">{option.description}</p>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}