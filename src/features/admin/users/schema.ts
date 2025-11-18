import { z } from "zod"
import { UserRole, UserStatus } from "@/interface/admin/user"

// validasi form add 
export const addUserSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  role: z.enum(["Super Admin", "Manager", "Auditor", "Supervisor"])
    .refine((val) => val !== undefined, {
      message: "Please select a role"
    }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
  status: z.enum(["Active", "Under Review", "Suspended"])
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

// validasi form edit
export const editUserSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  role: z.enum(["Super Admin", "Manager", "Auditor", "Supervisor"])
    .refine((val) => val !== undefined, {
      message: "Please select a role"
    }),
  password: z.string()
    .optional()
    .refine((val) => {
      if (!val || val.length === 0) return true
      return val.length >= 8
    }, "Password must be at least 8 characters")
    .refine((val) => {
      if (!val || val.length === 0) return true
      return /[A-Z]/.test(val)
    }, "Password must contain at least one uppercase letter")
    .refine((val) => {
      if (!val || val.length === 0) return true
      return /[a-z]/.test(val)
    }, "Password must contain at least one lowercase letter")
    .refine((val) => {
      if (!val || val.length === 0) return true
      return /[0-9]/.test(val)
    }, "Password must contain at least one number")
    .refine((val) => {
      if (!val || val.length === 0) return true
      return /[^A-Za-z0-9]/.test(val)
    }, "Password must contain at least one special character"),
  confirmPassword: z.string().optional(),
  status: z.enum(["Active", "Under Review", "Suspended"])
}).refine((data) => {
  // Only validate password match if password is provided
  if (data.password && data.password.length > 0) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type AddUserFormData = z.infer<typeof addUserSchema>
export type EditUserFormData = z.infer<typeof editUserSchema>

export const USER_ROLES: UserRole[] = [
  "Super Admin",
  "Manager",
  "Auditor",
  "Supervisor"
]

export const USER_STATUSES: UserStatus[] = [
  "Active",
  "Under Review",
  "Suspended"
]

export const generateUserId = (): string => {
  const prefix = "USR"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}${timestamp}${random}`
}

export const formatDate = (date: Date): string => {
  return date.toISOString()
}