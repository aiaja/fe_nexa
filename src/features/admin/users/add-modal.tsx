"use client"

import { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { UserData, UserRole, UserStatus } from '@/interface/admin/user'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addUserSchema, AddUserFormData, USER_ROLES, USER_STATUSES, generateUserId, formatDate } from './schema'

interface AddUserModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (user: UserData) => void
  existingUsernames?: string[]
  existingEmails?: string[]
}

export function AddUserModal({ 
  open, 
  onClose, 
  onSuccess,
  existingUsernames = [],
  existingEmails = []
}: AddUserModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      role: undefined,
      password: '',
      confirmPassword: '',
      status: 'Active'
    }
  })

  const watchedRole = watch('role')
  const watchedStatus = watch('status')

  if (!open) return null

  const onSubmit = (data: AddUserFormData) => {
    // Check for duplicate username
    if (existingUsernames.includes(data.username.toLowerCase())) {
      setError('username', {
        type: 'manual',
        message: 'Username already exists'
      })
      return
    }

    // Check for duplicate email
    if (existingEmails.includes(data.email.toLowerCase())) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists'
      })
      return
    }

    const newUser: UserData = {
      id: generateUserId(),
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: formatDate(new Date())
    }

    onSuccess(newUser)
    handleClose()
  }

  const handleClose = () => {
    reset()
    setShowPassword(false)
    setShowConfirmPassword(false)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
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
                Username <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                {...register('username', {
                  onChange: (e) => {
                    e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
                  }
                })}
                placeholder="john_doe"
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.username.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Letters, numbers, and underscores only</p>
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

            <Field>
              <FieldLabel>
                Email Address <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="email"
                {...register('email')}
                placeholder="john.doe@example.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.email.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Role <span className="text-red-500">*</span>
              </FieldLabel>
              <Select 
                value={watchedRole} 
                onValueChange={(value) => setValue('role', value as UserRole, { shouldValidate: true })}
              >
                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.role.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Password <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  placeholder="Enter password"
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.password.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Min 8 characters, include uppercase, lowercase, number & special character
              </p>
            </Field>

            <Field>
              <FieldLabel>
                Confirm Password <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword')}
                  placeholder="Re-enter password"
                  className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.confirmPassword.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Status <span className="text-red-500">*</span>
              </FieldLabel>
              <Select 
                value={watchedStatus} 
                onValueChange={(value) => setValue('status', value as UserStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {USER_STATUSES.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                Create User
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}