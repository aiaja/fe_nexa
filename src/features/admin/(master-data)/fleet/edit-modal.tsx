"use client"

import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { FleetData, FleetType, FleetStatus } from '@/interface/admin/fleet'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { fleetSchema, FleetFormData, FLEET_TYPES, FLEET_STATUSES, FLEET_YEARS } from './schema'

interface EditFleetModalProps {
  open: boolean
  onClose: () => void
  fleet: FleetData | null
  onSuccess: (fleet: FleetData) => void
}

export function EditFleetModal({ open, onClose, fleet, onSuccess }: EditFleetModalProps) {
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isReady, setIsReady] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FleetFormData>({
    resolver: zodResolver(fleetSchema),
    defaultValues: {
      licensePlate: '',
      photo: '',
      type: undefined,
      brands: '',
      model: '',
      year: '',
      status: 'Active'
    }
  })

  const watchedType = watch('type')
  const watchedYear = watch('year')
  const watchedStatus = watch('status')

  // Pre-fill form when fleet data changes
  useEffect(() => {
    if (fleet && open) {
      setIsReady(false)
      
      reset({
        licensePlate: fleet.licensePlate,
        photo: fleet.photo || '',
        type: fleet.type,
        brands: fleet.brands,
        model: fleet.model,
        year: fleet.year,
        status: fleet.status
      })
      
      setPreviewImage(fleet.photo || '')
      
      // Delay to ensure state is set
      setTimeout(() => setIsReady(true), 0)
    }
  }, [fleet, open, reset])

  if (!open || !fleet) return null

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

  const onSubmit = (data: FleetFormData) => {
    const updatedFleet: FleetData = {
      ...fleet,
      licensePlate: data.licensePlate,
      photo: data.photo || undefined,
      type: data.type,
      brands: data.brands,
      model: data.model,
      year: data.year,
      status: data.status
    }

    onSuccess(updatedFleet)
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
            <h3 className="text-lg font-semibold text-gray-900">Edit Fleet</h3>
            <p className="text-sm text-gray-500">{fleet.fleetID}</p>
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
              <FieldLabel>Fleet ID</FieldLabel>
              <Input
                type="text"
                value={fleet.fleetID}
                disabled
                className="bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </Field>

            <Field>
              <FieldLabel>
                License Plate <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                {...register('licensePlate', {
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase()
                  }
                })}
                placeholder="B 1234 ABC"
                className={errors.licensePlate ? 'border-red-500' : ''}
              />
              {errors.licensePlate && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.licensePlate.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Type <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={watchedType} 
                  onValueChange={(value) => setValue('type', value as FleetType, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FLEET_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.type && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.type.message}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  Brand <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  {...register('brands')}
                  placeholder="Volvo"
                  className={errors.brands ? 'border-red-500' : ''}
                />
                {errors.brands && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.brands.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>
                  Model <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  {...register('model')}
                  placeholder="FH16"
                  className={errors.model ? 'border-red-500' : ''}
                />
                {errors.model && (
                  <p className="text-xs text-red-500 mt-1">⚠️ {errors.model.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>
                Year <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={watchedYear} 
                  onValueChange={(value) => setValue('year', value, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.year ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {FLEET_YEARS.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.year && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.year.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Status <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={watchedStatus} 
                  onValueChange={(value) => setValue('status', value as FleetStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FLEET_STATUSES.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
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
                Update Fleet
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}