// features/superadmin/tenants/add-modal.tsx
"use client"

import { X } from 'lucide-react'
import { Tenant, SubscriptionPlan, SubscriptionPeriod } from "@/interface/superadmin/tenant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { calculateSubscriptionEnd } from "@/data/superadmin/tenant"

// Schema
const addTenantSchema = z.object({
  company_name: z.string().min(3, "Company name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  plan: z.enum(["BASIC", "PREMIUM"] as const),
  period: z.enum(["TRIAL", "MONTHLY", "QUARTERLY", "YEARLY"] as const)
})

type AddTenantFormData = z.infer<typeof addTenantSchema>

interface AddTenantModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (tenant: Tenant) => void
  existingEmails?: string[]
}

// Helper: Generate Tenant ID
const generateTenantId = (): string => {
  const prefix = 'TNT-'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
  return `${prefix}${timestamp}${random}`
}

// Helper: Get default period for plan
const getDefaultPeriodForPlan = (plan: SubscriptionPlan): SubscriptionPeriod => {
  return plan === "BASIC" ? "TRIAL" : "MONTHLY"
}

// Helper: Get period options for plan
const getPeriodOptions = (plan: SubscriptionPlan): SubscriptionPeriod[] => {
  if (plan === "BASIC") return ["TRIAL"]
  return ["MONTHLY", "QUARTERLY", "YEARLY"]
}

// Helper: Get status description
const getStatusDescription = (plan: SubscriptionPlan, period: SubscriptionPeriod): string => {
  if (plan === "BASIC") {
    return "🔵 Status will be set to ACTIVE (14-day free trial)"
  }
  return `🟢 Status will be set to ACTIVE (${period.toLowerCase()} subscription)`
}

export function AddTenantModal({ 
  open, 
  onClose, 
  onSuccess,
  existingEmails = []
}: AddTenantModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError
  } = useForm<AddTenantFormData>({
    resolver: zodResolver(addTenantSchema),
    defaultValues: {
      company_name: '',
      email: '',
      address: '',
      plan: 'BASIC',
      period: 'TRIAL'
    }
  })

  const watchedPlan = watch('plan')
  const watchedPeriod = watch('period')

  if (!open) return null

  const onSubmit = (data: AddTenantFormData) => {
    // Check for duplicate email
    if (existingEmails.includes(data.email.toLowerCase())) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists'
      })
      return
    }

    const now = new Date().toISOString()
    const subscriptionEnd = calculateSubscriptionEnd(now, data.period)

    const newTenant: Tenant = {
      id: generateTenantId(),
      company_name: data.company_name,
      email: data.email,
      address: data.address,
      plan: data.plan,
      period: data.period,
      tenantStatus: 'ACTIVE', // Always ACTIVE when created
      subscriptionStart: now,
      subscriptionEnd: subscriptionEnd,
      createdAt: now,
      updatedAt: now
    }

    onSuccess(newTenant)
    handleClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-semibold text-gray-900">Add New Tenant</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <FieldGroup>
            <Field>
              <FieldLabel>
                Company Name <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                {...register('company_name')}
                placeholder="PT Example Mining"
                className={errors.company_name ? 'border-red-500' : ''}
              />
              {errors.company_name && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.company_name.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Email Address <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="email"
                {...register('email')}
                placeholder="admin@company.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.email.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Primary contact email for this tenant
              </p>
            </Field>

            <Field>
              <FieldLabel>
                Address <span className="text-red-500">*</span>
              </FieldLabel>
              <Textarea
                {...register('address')}
                placeholder="Jl. Example No. 123, Jakarta"
                rows={3}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.address.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Subscription Plan <span className="text-red-500">*</span>
              </FieldLabel>
              <Select 
                value={watchedPlan} 
                onValueChange={(value) => {
                  const newPlan = value as SubscriptionPlan
                  setValue('plan', newPlan, { shouldValidate: true })
                  setValue('period', getDefaultPeriodForPlan(newPlan))
                }}
              >
                <SelectTrigger className={errors.plan ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BASIC">
                    <div className="flex flex-col">
                      <span className="font-medium">Basic (Free Trial)</span>
                      <span className="text-xs text-gray-500">5 fleets, 3 users • 14-day trial</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="PREMIUM">
                    <div className="flex flex-col">
                      <span className="font-medium">Premium</span>
                      <span className="text-xs text-gray-500">Unlimited fleets & users</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.plan && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.plan.message}</p>
              )}
            </Field>

            {/* Period Selection */}
            <Field>
              <FieldLabel>
                Subscription Period <span className="text-red-500">*</span>
              </FieldLabel>
              <Select 
                value={watchedPeriod} 
                onValueChange={(value) => setValue('period', value as SubscriptionPeriod)}
                disabled={watchedPlan === "BASIC"}
              >
                <SelectTrigger className={errors.period ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {getPeriodOptions(watchedPlan).map(period => (
                    <SelectItem key={period} value={period}>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {period === "TRIAL" ? "14-Day Trial" :
                           period === "MONTHLY" ? "Monthly" :
                           period === "QUARTERLY" ? "Quarterly (3 Months)" :
                           "Yearly (12 Months)"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {period === "TRIAL" ? "FREE" :
                           period === "MONTHLY" ? "$99/month" :
                           period === "QUARTERLY" ? "$269 (save 10%)" :
                           "$999 (save 15%)"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.period && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.period.message}</p>
              )}
            </Field>

            {/* Status Info */}
            <Field>
              <FieldLabel>Status</FieldLabel>
              <Input
                type="text"
                value="ACTIVE"
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                {getStatusDescription(watchedPlan, watchedPeriod)}
              </p>
            </Field>

            <Field orientation="horizontal" className="pt-4 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0047AB] hover:bg-[#003580]"
              >
                Create Tenant
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}