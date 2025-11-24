"use client"

import { useState, useMemo } from 'react'
import { Filter } from 'lucide-react'
import { TenantStatus, SubscriptionPlan } from "@/interface/superadmin/tenant"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FilterPopoverProps {
  onApply: (filters: FilterValues) => void
  currentFilters: FilterValues
}

export interface FilterValues {
  statuses: TenantStatus[]
  plans: SubscriptionPlan[]
}

function FilterIconFilled({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}

export function FilterPopover({ onApply, currentFilters }: FilterPopoverProps) {
  const [open, setOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<TenantStatus[]>(currentFilters.statuses)
  const [selectedPlans, setSelectedPlans] = useState<SubscriptionPlan[]>(currentFilters.plans)
  const [isReady, setIsReady] = useState(false)

  const tenantStatuses: TenantStatus[] = ["ACTIVE", "TRIAL", "SUSPENDED", "EXPIRED", "INACTIVE"]
  const subscriptionPlans: SubscriptionPlan[] = ["FREE", "STARTER", "BUSINESS", "ENTERPRISE"]

  const activeFilterCount = 
    selectedStatuses.length + 
    selectedPlans.length

  const hasActiveFilters = activeFilterCount > 0

  const handleStatusToggle = (status: TenantStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const handlePlanToggle = (plan: SubscriptionPlan) => {
    setSelectedPlans(prev =>
      prev.includes(plan)
        ? prev.filter(p => p !== plan)
        : [...prev, plan]
    )
  }

  const handleApply = () => {
    onApply({
      statuses: selectedStatuses,
      plans: selectedPlans
    })
    setOpen(false)
  }

  const handleReset = () => {
    const resetFilters = {
      statuses: [],
      plans: []
    }
    setSelectedStatuses([])
    setSelectedPlans([])
    onApply(resetFilters)
    setOpen(false)
  }

  useMemo(() => {
    if (open) {
      setIsReady(false)
      setSelectedStatuses(currentFilters.statuses)
      setSelectedPlans(currentFilters.plans)
      setTimeout(() => setIsReady(true), 0)
    }
  }, [open, currentFilters])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className={`relative flex items-center gap-2 px-4 h-10 border rounded-lg transition-colors ${
            hasActiveFilters 
              ? 'border-[#0047AB] bg-blue-50 text-[#0047AB] hover:bg-blue-100' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {hasActiveFilters ? (
            <FilterIconFilled className="h-4 w-4" />
          ) : (
            <Filter className="h-4 w-4" />
          )}
          {hasActiveFilters ? 'Filtered by' : 'Filter by'}
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-sm">
              {activeFilterCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-96 p-0" 
        align="end"
        sideOffset={8}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Filter by:</h3>
          </div>

          <FieldGroup className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700">Tenant Status</h4>
              <div className="grid grid-cols-2 gap-2">
                {tenantStatuses.map((status) => (
                  <Field key={status} orientation="horizontal" className="items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => handleStatusToggle(status)}
                    />
                    <FieldLabel 
                      htmlFor={`status-${status}`}
                      className="text-xs font-normal cursor-pointer"
                    >
                      {status.charAt(0) + status.slice(1).toLowerCase()}
                    </FieldLabel>
                  </Field>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700">Subscription Plan</h4>
              <div className="grid grid-cols-2 gap-2">
                {subscriptionPlans.map((plan) => (
                  <Field key={plan} orientation="horizontal" className="items-center space-x-2">
                    <Checkbox
                      id={`plan-${plan}`}
                      checked={selectedPlans.includes(plan)}
                      onCheckedChange={() => handlePlanToggle(plan)}
                    />
                    <FieldLabel 
                      htmlFor={`plan-${plan}`}
                      className="text-xs font-normal cursor-pointer"
                    >
                      {plan.charAt(0) + plan.slice(1).toLowerCase()}
                    </FieldLabel>
                  </Field>
                ))}
              </div>
            </div>
          </FieldGroup>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1 h-8 text-xs bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              className="flex-1 h-8 text-xs bg-[#0047AB] hover:bg-[#003d99] text-white border-[#0047AB]"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}