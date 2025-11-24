"use client"

import { X } from 'lucide-react'
import { Tenant, TenantStatus, SubscriptionPlan } from "@/interface/superadmin/tenant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  addTenantSchema, 
  AddTenantFormData, 
  generateTenantId,
  formatDate,
  getDefaultStatusForPlan,
  getAddModalStatusDescription
} from './schema'

interface AddTenantModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (tenant: Tenant) => void
  existingEmails?: string[]
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
      plan: 'FREE',
      tenantStatus: 'TRIAL'
    }
  })

  const watchedPlan = watch('plan')

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

    const newTenant: Tenant = {
      id: generateTenantId(),
      company_name: data.company_name,
      email: data.email,
      address: data.address,
      plan: data.plan,
      tenantStatus: data.tenantStatus,
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date())
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
                  setValue('tenantStatus', getDefaultStatusForPlan(newPlan))
                }}
              >
                <SelectTrigger className={errors.plan ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select plan">
                    {watchedPlan} 
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE">
                    <div className="flex flex-col">
                      <span className="font-medium">Free</span>
                      <span className="text-xs text-gray-500">5 fleets, 3 users</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="STARTER">
                    <div className="flex flex-col">
                      <span className="font-medium">Starter</span>
                      <span className="text-xs text-gray-500">20 fleets, 10 users</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="BUSINESS">
                    <div className="flex flex-col">
                      <span className="font-medium">Business</span>
                      <span className="text-xs text-gray-500">100 fleets, 50 users</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ENTERPRISE">
                    <div className="flex flex-col">
                      <span className="font-medium">Enterprise</span>
                      <span className="text-xs text-gray-500">Unlimited</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.plan && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.plan.message}</p>
              )}
            </Field>

            {/* status */}
            <Field>
              <FieldLabel>
                Status <span className="text-red-500">*</span>
              </FieldLabel>
              
              <Input
                type="text"
                value={getDefaultStatusForPlan(watchedPlan)}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              
              <p className="text-xs text-gray-500 mt-1">
                {getAddModalStatusDescription(watchedPlan)}
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