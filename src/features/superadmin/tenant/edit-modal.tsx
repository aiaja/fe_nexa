"use client"

import { useState, useEffect } from 'react'
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
  editTenantSchema, 
  EditTenantFormData,
  getAvailableStatusesForPlan,
  getDefaultStatusForPlan,
} from './schema'

interface EditTenantModalProps {
  open: boolean
  onClose: () => void
  tenant: Tenant | null
  onSuccess: (tenant: Tenant) => void
  existingEmails?: string[]
}

export function EditTenantModal({ 
  open, 
  onClose, 
  tenant, 
  onSuccess,
  existingEmails = []
}: EditTenantModalProps) {
  const [isReady, setIsReady] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError
  } = useForm<EditTenantFormData>({
    resolver: zodResolver(editTenantSchema),
    defaultValues: {
      company_name: '',
      email: '',
      address: '',
      plan: 'FREE',
      tenantStatus: 'TRIAL'
    }
  })

  const watchedPlan = watch('plan')
  const watchedStatus = watch('tenantStatus')

  useEffect(() => {
    if (tenant && open) {
      setIsReady(false)
      
      reset({
        company_name: tenant.company_name,
        email: tenant.email,
        address: tenant.address,
        plan: tenant.plan,
        tenantStatus: tenant.tenantStatus
      })
      
      setTimeout(() => setIsReady(true), 0)
    }
  }, [tenant, open, reset])

  if (!open || !tenant) return null


  const availableStatuses = getAvailableStatusesForPlan(watchedPlan)

  const handlePlanChange = (newPlan: SubscriptionPlan) => {
    setValue('plan', newPlan, { shouldValidate: true })
    
    const allowedStatuses = getAvailableStatusesForPlan(newPlan)
    if (!allowedStatuses.includes(watchedStatus)) {
      setValue('tenantStatus', getDefaultStatusForPlan(newPlan))
    }
  }

  const onSubmit = (data: EditTenantFormData) => {
    if (data.email.toLowerCase() !== tenant.email.toLowerCase() && 
        existingEmails.includes(data.email.toLowerCase())) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists'
      })
      return
    }

    const updatedTenant: Tenant = {
      ...tenant,
      company_name: data.company_name,
      email: data.email,
      address: data.address,
      plan: data.plan,
      tenantStatus: data.tenantStatus,
      updatedAt: new Date().toISOString()
    }

    onSuccess(updatedTenant)
    handleClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Edit Tenant</h3>
            <p className="text-sm text-gray-500">{tenant.id}</p>
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

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Tenant ID</FieldLabel>
              <Input
                type="text"
                value={tenant.id}
                disabled
                className="bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </Field>

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
              {isReady ? (
                <Select 
                  value={watchedPlan} 
                  onValueChange={handlePlanChange}
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
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.plan && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.plan.message}</p>
              )}
            </Field>
            
            <Field>
              <FieldLabel>
                Status <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={watchedStatus} 
                  onValueChange={(value) => setValue('tenantStatus', value as TenantStatus, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.tenantStatus ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStatuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.tenantStatus && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.tenantStatus.message}</p>
              )}
            </Field>

            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Created At</p>
                  <p className="font-medium">
                    {new Date(tenant.createdAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Last Updated</p>
                  <p className="font-medium">
                    {new Date(tenant.updatedAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

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
                Update Tenant
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}