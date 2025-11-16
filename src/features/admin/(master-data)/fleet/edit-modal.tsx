"use client"

import { useState, useEffect } from 'react'
import { X, Upload, CalendarIcon } from 'lucide-react'
import { FleetData, FleetType, FleetStatus } from '@/interface/admin/fleet'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditFleetModalProps {
  open: boolean
  onClose: () => void
  fleet: FleetData | null
  onSuccess: (fleet: FleetData) => void
}

export function EditFleetModal({ open, onClose, fleet, onSuccess }: EditFleetModalProps) {
  const [formData, setFormData] = useState({
    plateNumber: '',
    photo: '',
    type: '' as FleetType | '',
    brands: '',
    model: '',
    year: '',
    purchaseDate: undefined as Date | undefined,
    initialMileage: '',
    status: 'Active' as FleetStatus
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isReady, setIsReady] = useState(false)

  const fleetTypes: FleetType[] = ["Haul Truck", "Dump Truck", "Tanker", "Excavator", "Bulldozer", "Loader"]
  const fleetStatuses: FleetStatus[] = ["Active", "Inactive", "Maintenance", "Under Review"]
  const years = Array.from({ length: 15 }, (_, i) => (2024 - i).toString())

  // Pre-fill form when fleet data changes
  useEffect(() => {
    if (fleet && open) {
      setIsReady(false)
      setFormData({
        plateNumber: fleet.plateNumber,
        photo: fleet.photo || '',
        type: fleet.type,
        brands: fleet.brands,
        model: fleet.model,
        year: fleet.year,
        purchaseDate: fleet.purchaseDate ? new Date(fleet.purchaseDate) : undefined,
        initialMileage: fleet.initialMileage?.toString() || '',
        status: fleet.status
      })
      setPreviewImage(fleet.photo || '')
      setErrors({}) // Reset errors saat modal dibuka
      
      // Delay biar state kebaca dulu
      setTimeout(() => setIsReady(true), 0)
    }
  }, [fleet, open])

  if (!open || !fleet) return null

  const validatePlateNumber = (plate: string): boolean => {
    const regex = /^[A-Z]{1,2}\s\d{1,4}\s[A-Z]{1,3}$/
    return regex.test(plate)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setFormData(prev => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.plateNumber) {
      newErrors.plateNumber = 'Plate number is required'
    } else if (!validatePlateNumber(formData.plateNumber)) {
      newErrors.plateNumber = 'Invalid format. Use: B 1234 ABC'
    }

    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.brands) newErrors.brands = 'Brands is required'
    if (!formData.model) newErrors.model = 'Model is required'
    if (!formData.year) newErrors.year = 'Year is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const updatedFleet: FleetData = {
      ...fleet,
      plateNumber: formData.plateNumber,
      photo: formData.photo || undefined,
      type: formData.type as FleetType,
      brands: formData.brands,
      model: formData.model,
      year: formData.year,
      purchaseDate: formData.purchaseDate ? format(formData.purchaseDate, 'yyyy-MM-dd') : undefined,
      initialMileage: formData.initialMileage ? parseInt(formData.initialMileage) : undefined,
      status: formData.status
    }

    onSuccess(updatedFleet)
    handleClose()
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Edit Fleet</h3>
            <p className="text-sm text-gray-500">{fleet.id}</p>
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

        <form onSubmit={handleSubmit} className="p-6">
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
                        setFormData(prev => ({ ...prev, photo: '' }))
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
                value={fleet.id}
                disabled
                className="bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </Field>


            <Field>
              <FieldLabel>
                Plate Number <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                value={formData.plateNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, plateNumber: e.target.value.toUpperCase() }))}
                placeholder="B 1234 ABC"
                className={errors.plateNumber ? 'border-red-500' : ''}
              />
              {errors.plateNumber && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.plateNumber}</p>
              )}
            </Field>


            <Field>
              <FieldLabel>
                Type <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as FleetType }))}
                >
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fleetTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.type && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.type}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  Brands <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  value={formData.brands}
                  onChange={(e) => setFormData(prev => ({ ...prev, brands: e.target.value }))}
                  placeholder="Volvo"
                  className={errors.brands ? 'border-red-500' : ''}
                />
                {errors.brands && (
                  <p className="text-xs text-red-500 mt-1">⚠ {errors.brands}</p>
                )}
              </Field>

              <Field>
                <FieldLabel>
                  Model <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="FH16"
                  className={errors.model ? 'border-red-500' : ''}
                />
                {errors.model && (
                  <p className="text-xs text-red-500 mt-1">⚠ {errors.model}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>
                Year <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={formData.year}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
                >
                  <SelectTrigger className={errors.year ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.year && (
                <p className="text-xs text-red-500 mt-1">⚠ {errors.year}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Purchase Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.purchaseDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.purchaseDate ? format(formData.purchaseDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.purchaseDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, purchaseDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field>
                <FieldLabel>Initial Mileage (km)</FieldLabel>
                <Input
                  type="number"
                  value={formData.initialMileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, initialMileage: e.target.value }))}
                  placeholder="0"
                  min="0"
                />
              </Field>
            </div>


            <Field>
              <FieldLabel>
                Status <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
                <Select 
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as FleetStatus }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fleetStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
            </Field>

            {/* Actions */}
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
                className="flex-1"
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