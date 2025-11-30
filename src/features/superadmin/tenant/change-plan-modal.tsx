"use client"

import { useState, useEffect } from 'react'
import { X, CreditCard, AlertCircle } from 'lucide-react'
import { Tenant, SubscriptionPlan, SubscriptionPeriod } from "@/interface/superadmin/tenant"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  changePlanSchema, 
  ChangePlanFormData,
  isDowngrade,
  getPlanChangeDescription,
  getAvailablePeriodsForPlan,
  getDefaultPeriodForPlan,
  getPlanDisplayName,
  getPeriodDisplayName
} from './schema'
import { calculateSubscriptionEnd, PLAN_DETAILS } from '@/data/superadmin/tenant'

interface ChangePlanModalProps {
  open: boolean
  onClose: () => void
  tenant: Tenant | null
  onSuccess: (tenant: Tenant) => void
}

// Helper untuk dapetin price berdasarkan period
function getPeriodPrice(period: SubscriptionPeriod): string {
  const prices = {
    TRIAL: 'FREE',
    MONTHLY: '$99',
    QUARTERLY: '$249',
    YEARLY: '$999'
  }
  return prices[period]
}

export function ChangePlanModal({ 
  open, 
  onClose, 
  tenant, 
  onSuccess
}: ChangePlanModalProps) {
  const [isReady, setIsReady] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ChangePlanFormData>({
    resolver: zodResolver(changePlanSchema),
    defaultValues: {
      plan: 'BASIC',
      period: 'TRIAL'
    }
  })

  const watchedPlan = watch('plan')
  const watchedPeriod = watch('period')

  useEffect(() => {
    if (tenant && open) {
      setIsReady(false)
      
      reset({
        plan: tenant.plan,
        period: tenant.period
      })
      
      setTimeout(() => setIsReady(true), 0)
    }
  }, [tenant, open, reset])

  if (!open || !tenant) return null

  const availablePeriods = getAvailablePeriodsForPlan(watchedPlan)
  const isChangingPlan = watchedPlan !== tenant.plan
  const isDowngrading = isDowngrade(tenant.plan, watchedPlan)

  const handlePlanChange = (newPlan: SubscriptionPlan) => {
    setValue('plan', newPlan, { shouldValidate: true })
    
    // Auto-adjust period if invalid for new plan
    const allowedPeriods = getAvailablePeriodsForPlan(newPlan)
    if (!allowedPeriods.includes(watchedPeriod)) {
      setValue('period', getDefaultPeriodForPlan(newPlan))
    }
  }

  const onSubmit = (data: ChangePlanFormData) => {
    const now = new Date().toISOString()
    const newSubscriptionEnd = calculateSubscriptionEnd(now, data.period)

    const updatedTenant: Tenant = {
      ...tenant,
      plan: data.plan,
      period: data.period,
      tenantStatus: 'ACTIVE',
      subscriptionStart: now,
      subscriptionEnd: newSubscriptionEnd,
      updatedAt: now
    }

    onSuccess(updatedTenant)
    handleClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const currentPlanDetails = PLAN_DETAILS[tenant.plan]
  const newPlanDetails = PLAN_DETAILS[watchedPlan]

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#0047AB]" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Change Subscription Plan</h3>
              <p className="text-sm text-gray-500">{tenant.company_name}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <FieldGroup>
            {/* Current Plan Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Current Plan</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">{currentPlanDetails.displayName}</p>
                  <p className="text-sm text-gray-600">{currentPlanDetails.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Period</p>
                  <p className="text-sm font-medium text-gray-900">
                    {getPeriodDisplayName(tenant.period)}
                  </p>
                </div>
              </div>
            </div>

            {/* New Plan Selection */}
            <Field>
              <FieldLabel>
                New Subscription Plan <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={watchedPlan} 
                  onValueChange={handlePlanChange}
                >
                  <SelectTrigger className={errors.plan ? 'border-red-500' : ''}>
                    <SelectValue>
                      {getPlanDisplayName(watchedPlan)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BASIC">
                      <div className="flex flex-col py-2">
                        <span className="font-medium">Basic (Free Trial)</span>
                        <span className="text-xs text-gray-500">10 fleets, 5 users • 14-day trial</span>
                        <span className="text-xs font-semibold text-green-600 mt-1">FREE</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="PREMIUM">
                      <div className="flex flex-col py-2">
                        <span className="font-medium">Premium</span>
                        <span className="text-xs text-gray-500">Unlimited fleets & users</span>
                        <span className="text-xs font-semibold text-blue-600 mt-1">Starting from $99/month</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.plan && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.plan.message}</p>
              )}
            </Field>

            {/* Period Selection */}
            <Field>
              <FieldLabel>
                Subscription Period <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={watchedPeriod} 
                  onValueChange={(value) => setValue('period', value as SubscriptionPeriod, { shouldValidate: true })}
                  disabled={watchedPlan === "BASIC"}
                >
                  <SelectTrigger className={errors.period ? 'border-red-500' : ''}>
                    <SelectValue>
                      {getPeriodDisplayName(watchedPeriod)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availablePeriods.map(period => (
                      <SelectItem key={period} value={period}>
                        <div className="flex flex-col py-1">
                          <span className="font-medium">
                            {getPeriodDisplayName(period)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getPeriodPrice(period)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.period && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.period.message}</p>
              )}
            </Field>

            {/* Plan Change Warning */}
            {isChangingPlan && (
              <div className={`rounded-lg p-4 border ${
                isDowngrading 
                  ? 'bg-orange-50 border-orange-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${
                    isDowngrading ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isDowngrading ? 'text-orange-900' : 'text-blue-900'
                    }`}>
                      {getPlanChangeDescription(tenant.plan, watchedPlan, watchedPeriod)}
                    </p>
                    {isDowngrading && (
                      <ul className="mt-2 text-xs text-orange-700 space-y-1">
                        <li>• Fleet limit will be reduced to 10</li>
                        <li>• User limit will be reduced to 5</li>
                        <li>• Advanced features will be disabled</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* New Plan Preview */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm font-medium text-gray-700 mb-3">New Plan Details</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900">{newPlanDetails.displayName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Period</span>
                  <span className="font-semibold text-gray-900">
                    {getPeriodDisplayName(watchedPeriod)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-gray-900">
                    {getPeriodPrice(watchedPeriod)}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <p className="text-xs text-gray-600 mb-1">Features:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {newPlanDetails.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center pt-4 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="flex-1 bg-[#0047AB] hover:bg-[#003580]"
              >
                {isDowngrading ? 'Downgrade Plan' : 'Upgrade Plan'}
              </Button>
            </div>
          </FieldGroup>
        </div>
      </div>
    </>
  )
}