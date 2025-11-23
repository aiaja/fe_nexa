"use client"

import { useState, useEffect } from 'react'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TenantWithCounts, SubscriptionPlan } from '@/interface/superadmin/tenant'

interface ChangePlanModalProps {
  open: boolean
  onClose: () => void
  tenant: TenantWithCounts | null
  onSuccess: (updatedTenant: TenantWithCounts) => void
}

const PLANS: Array<{ value: SubscriptionPlan; label: string; price: string }> = [
  { value: 'FREE', label: 'Free', price: '$0/month' },
  { value: 'STARTER', label: 'Starter', price: '$29/month' },
  { value: 'BUSINESS', label: 'Business', price: '$99/month' },
  { value: 'ENTERPRISE', label: 'Enterprise', price: '$299/month' },
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

  const handleSubmit = async () => {
    if (selectedPlan === tenant.plan) {
      onClose()
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const updatedTenant: TenantWithCounts = {
        ...tenant,
        plan: selectedPlan,
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md z-50">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Change Plan</h2>
            <p className="text-sm text-gray-500 mt-1">{tenant.company_name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Current Plan: <span className="font-bold text-[#0047AB]">{tenant.plan}</span>
            </label>
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
        </div>

        <div className="flex items-center gap-3 p-6 border-t bg-gray-50">
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
            className="flex-1 bg-[#0047AB] hover:bg-[#003580]"
            disabled={isSubmitting || selectedPlan === tenant.plan}
          >
            {isSubmitting ? 'Saving...' : 'Change Plan'}
          </Button>
        </div>
      </div>
    </>
  )
}