"use client"

import { useState } from 'react'
import { X, Upload, CalendarIcon } from 'lucide-react'
import { DriverData, LicenseType, DriverStatus } from '@/interface/admin/driver'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { driverSchema, DriverFormData, LICENSE_TYPES, DRIVER_STATUSES } from './schema'

interface AddDriverModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (driver: DriverData) => void
}

export function AddDriverModal({ open, onClose, onSuccess }: AddDriverModalProps) {
  const [previewImage, setPreviewImage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      photo: '',
      name: '',
      simNumber: '',
      license: undefined,
      phone: '',
      email: '',
      address: '',
      joinDate: '',
      status: 'Active'
    }
  })

  const watchedLicense = watch('license')
  const watchedStatus = watch('status')
  const watchedJoinDate = watch('joinDate')

  const parsedJoinDate = watchedJoinDate ? new Date(watchedJoinDate) : undefined

  if (!open) return null

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        setValue('photo', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data: DriverFormData) => {
    const newDriver: DriverData = {
      id: `DRV-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      photo: data.photo || undefined,
      name: data.name,
      simNumber: data.simNumber,
      license: data.license,
      phone: data.phone,
      email: data.email || undefined,
      address: data.address || undefined,
      joinDate: data.joinDate,
      incident: 0,
      status: data.status
    }

    onSuccess(newDriver)
    handleClose()
  }

  const handleClose = () => {
    reset()
    setPreviewImage('')
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-semibold text-gray-900">Add New Driver</h3>
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
              <FieldLabel>Upload Photo</FieldLabel>
              <div className="flex items-center gap-4 mt-2">
                {previewImage ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setPreviewImage('')
                        setValue('photo', '')
                      }}
                      className="absolute top-1 right-1 h-6 w-6"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
                <div className="text-xs text-gray-500">
                  <p>PNG, JPG up to 5MB</p>
                  <p>Recommended: 400x400px</p>
                </div>
              </div>
            </Field>

            <Field>
              <FieldLabel>
                Full Name <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                {...register('name')}
                placeholder="John Doe"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.name.message}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  License Number <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  {...register('simNumber', {
                    onChange: (e) => {
                      e.target.value = e.target.value.toUpperCase()
                    }
                  })}
                  placeholder="1234567890ABC"
                  className={errors.simNumber ? 'border-red-500' : ''}
                />
                {errors.simNumber && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.simNumber.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>
                  License Type <span className="text-red-500">*</span>
                </FieldLabel>
                <Select 
                  value={watchedLicense} 
                  onValueChange={(value) => setValue('license', value as LicenseType, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.license ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    {LICENSE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>SIM {type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.license && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.license.message}</p>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  Phone Number <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  {...register('phone')}
                  placeholder="08123456789"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.phone.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="driver@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.email.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <Textarea
                {...register('address')}
                placeholder="Enter full address"
                rows={3}
                className={errors.address ? 'border-red-500' : ''}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  Join Date <span className="text-red-500">*</span>
                </FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !parsedJoinDate && "text-muted-foreground",
                        errors.joinDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {parsedJoinDate ? format(parsedJoinDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parsedJoinDate}
                      onSelect={(date) => {
                        if (date) {
                          setValue('joinDate', format(date, 'yyyy-MM-dd'), { shouldValidate: true })
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.joinDate && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.joinDate.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>
                  Status <span className="text-red-500">*</span>
                </FieldLabel>
                <Select 
                  value={watchedStatus} 
                  onValueChange={(value) => setValue('status', value as DriverStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DRIVER_STATUSES.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
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
                Save Driver
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}