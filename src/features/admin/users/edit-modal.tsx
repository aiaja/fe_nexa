"use client"

import { useState, useEffect } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { UserData, UserRole, UserStatus } from '@/interface/admin/user'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editUserSchema, EditUserFormData, USER_ROLES, USER_STATUSES } from './schema'

interface EditUserModalProps {
  open: boolean
  onClose: () => void
  user: UserData | null
  onSuccess: (user: UserData) => void
  existingUsernames?: string[]
  existingEmails?: string[]
}

export function EditUserModal({ 
  open, 
  onClose, 
  user, 
  onSuccess,
  existingUsernames = [],
  existingEmails = []
}: EditUserModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    setError
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
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

  // Pre-fill form when user data changes
  useEffect(() => {
    if (user && open) {
      setIsReady(false)
      
      reset({
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        confirmPassword: '',
        status: user.status
      })
      
      // Delay to ensure state is set
      setTimeout(() => setIsReady(true), 0)
    }
  }, [user, open, reset])

  if (!open || !user) return null

  const onSubmit = (data: EditUserFormData) => {
    // Check for duplicate username (excluding current user)
    if (data.username.toLowerCase() !== user.username.toLowerCase() && 
        existingUsernames.includes(data.username.toLowerCase())) {
      setError('username', {
        type: 'manual',
        message: 'Username already exists'
      })
      return
    }

    // Check for duplicate email (excluding current user)
    if (data.email.toLowerCase() !== user.email.toLowerCase() && 
        existingEmails.includes(data.email.toLowerCase())) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists'
      })
      return
    }

    const updatedUser: UserData = {
      ...user,
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status
    }

    onSuccess(updatedUser)
    handleClose()
  }

  const handleClose = () => {
    setShowPassword(false)
    setShowConfirmPassword(false)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
            <p className="text-sm text-gray-500">{user.id}</p>
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
              <FieldLabel>User ID</FieldLabel>
              <Input
                type="text"
                value={user.id}
                disabled
                className="bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </Field>

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
              {isReady ? (
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
              ) : (
                <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md" />
              )}
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">⚠️ {errors.role.message}</p>
              )}
            </Field>

            <div className="border-t pt-4 mt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Change Password (Optional)</p>
              <p className="text-xs text-gray-500 mb-4">Leave blank to keep current password</p>
              
              <div className="space-y-4">
                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register('password')}
                      placeholder="Enter new password"
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
                </Field>

                <Field>
                  <FieldLabel>Confirm New Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register('confirmPassword')}
                      placeholder="Re-enter new password"
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
              </div>
            </div>

            <Field>
              <FieldLabel>
                Status <span className="text-red-500">*</span>
              </FieldLabel>
              {isReady ? (
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
                Update User
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}