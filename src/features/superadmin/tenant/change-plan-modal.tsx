"use client"

import { useState, useEffect } from 'react'
import { X, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TenantWithCounts, SubscriptionPlan } from '@/interface/superadmin/tenant'
import { 
  getAutoStatusForPlanChange, 
  getPlanChangeDescription,
  isDowngrade
} from './schema'

interface ChangePlanModalProps {
  open: boolean
  onClose: () => void
  tenant: TenantWithCounts | null
  onSuccess: (updatedTenant: TenantWithCounts) => void
}

const PLANS: Array<{ value: SubscriptionPlan; label: string; price: string; description: string }> = [
  { 
    value: 'FREE', 
    label: 'Free', 
    price: '$0/month',
    description: '5 fleets, 3 users'
  },
  { 
    value: 'STARTER', 
    label: 'Starter', 
    price: '$29/month',
    description: '20 fleets, 10 users'
  },
  { 
    value: 'BUSINESS', 
    label: 'Business', 
    price: '$99/month',
    description: '100 fleets, 50 users'
  },
  { 
    value: 'ENTERPRISE', 
    label: 'Enterprise', 
    price: '$299/month',
    description: 'Unlimited resources'
  },
]

export function ChangePlanModal({ 
  open, 
  onClose, 
  tenant,
  onSuccess
}: ChangePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('STARTER')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open && tenant) {
      setSelectedPlan(tenant.plan)
    }
  }, [open, tenant])

  if (!open || !tenant) return null

  // auto status 
  const newStatus = getAutoStatusForPlanChange(selectedPlan)
  const changeDescription = tenant ? getPlanChangeDescription(tenant.plan, selectedPlan) : ''
  const isDowngrading = tenant ? isDowngrade(tenant.plan, selectedPlan) : false
  const isPlanChanged = selectedPlan !== tenant.plan

  const handleSubmit = async () => {
    if (!isPlanChanged) {
      onClose()
      return
    }

    setIsSubmitting(true) 
    setTimeout(() => {
      const updatedTenant: TenantWithCounts = {
        ...tenant,
        plan: selectedPlan,
        tenantStatus: newStatus, 
        updatedAt: new Date().toISOString()
      }
      
      onSuccess(updatedTenant)
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md z-50 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Change Plan</h2>
            <p className="text-sm text-gray-500 mt-1">{tenant.company_name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700">
              Current Plan: <span className="font-bold text-[#0047AB]">{tenant.plan}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Current Status: <span className="font-semibold">{tenant.tenantStatus}</span>
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Select New Plan</label>
            {PLANS.map((plan) => (
              <button
                key={plan.value}
                onClick={() => setSelectedPlan(plan.value)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  selectedPlan === plan.value
                    ? 'border-[#0047AB] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.value
                      ? 'border-[#0047AB] bg-[#0047AB]'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.value && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{plan.label}</p>
                    <p className="text-sm text-gray-500">{plan.price}</p>
                    <p className="text-xs text-gray-400">{plan.description}</p>
                  </div>
                </div>
                {tenant.plan === plan.value && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Current
                  </span>
                )}
              </button>
            ))}
          </div>

          {isPlanChanged && (
            <div className={`flex items-start gap-3 p-4 rounded-lg border ${
              isDowngrading 
                ? 'bg-orange-50 border-orange-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              <AlertCircle className={`h-5 w-5 mt-0.5 shrink-0 ${
                isDowngrading ? 'text-orange-600' : 'text-green-600'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Automatic Status Change
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {changeDescription}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  New status will be: <span className="font-semibold text-gray-900">{newStatus}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 p-6 border-t bg-gray-50 sticky bottom-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className={`flex-1 ${
              isDowngrading 
                ? 'bg-orange-600 hover:bg-orange-700' 
                : 'bg-[#0047AB] hover:bg-[#003580]'
            }`}
            disabled={isSubmitting || !isPlanChanged}
          >
            {isSubmitting ? 'Saving...' : isPlanChanged ? 'Change Plan' : 'No Changes'}
          </Button>
        </div>
      </div>
    </>
  )
}