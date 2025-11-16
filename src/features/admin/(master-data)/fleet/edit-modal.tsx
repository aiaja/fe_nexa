"use client"

import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { FleetData, FleetType, FleetStatus } from '@/interface/admin/fleet'

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
    purchaseDate: '',
    initialMileage: '',
    status: 'Active' as FleetStatus
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewImage, setPreviewImage] = useState<string>('')

  const fleetTypes: FleetType[] = ["Haul Truck", "Dump Truck", "Tanker", "Excavator", "Bulldozer", "Loader"]
  const fleetStatuses: FleetStatus[] = ["Active", "Inactive", "Maintenance", "Under Review"]
  const years = Array.from({ length: 15 }, (_, i) => (2024 - i).toString())

  // Pre-fill form when fleet data changes
  useEffect(() => {
    if (fleet && open) {
      setFormData({
        plateNumber: fleet.plateNumber,
        photo: fleet.photo || '',
        type: fleet.type,
        brands: fleet.brands,
        model: fleet.model,
        year: fleet.year,
        purchaseDate: fleet.purchaseDate || '',
        initialMileage: fleet.initialMileage?.toString() || '',
        status: fleet.status
      })
      setPreviewImage(fleet.photo || '')
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
      purchaseDate: formData.purchaseDate || undefined,
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
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <div className="flex items-center gap-4">
              {previewImage ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage('')
                      setFormData(prev => ({ ...prev, photo: '' }))
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
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
          </div>

          {/* Fleet ID (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fleet ID
            </label>
            <input
              type="text"
              value={fleet.id}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Plate Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plate Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.plateNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, plateNumber: e.target.value.toUpperCase() }))}
              placeholder="B 1234 ABC"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.plateNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.plateNumber && (
              <p className="text-xs text-red-500 mt-1">⚠️ {errors.plateNumber}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as FleetType }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select type</option>
              {fleetTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && (
              <p className="text-xs text-red-500 mt-1">⚠️ {errors.type}</p>
            )}
          </div>

          {/* Brands & Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brands <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.brands}
                onChange={(e) => setFormData(prev => ({ ...prev, brands: e.target.value }))}
                placeholder="Volvo"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.brands ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.brands && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.brands}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                placeholder="FH16"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.model ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.model && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.model}</p>
              )}
            </div>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.year ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && (
              <p className="text-xs text-red-500 mt-1">⚠️ {errors.year}</p>
            )}
          </div>

          {/* Purchase Date & Initial Mileage */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Mileage (km)
              </label>
              <input
                type="number"
                value={formData.initialMileage}
                onChange={(e) => setFormData(prev => ({ ...prev, initialMileage: e.target.value }))}
                placeholder="0"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as FleetStatus }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fleetStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Update Fleet
            </button>
          </div>
        </form>
      </div>
    </>
  )
}