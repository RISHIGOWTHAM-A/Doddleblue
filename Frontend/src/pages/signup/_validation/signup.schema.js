import { z } from 'zod'

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    profileImage: z
      .string()
      .trim()
      .refine((v) => v === '' || /^https?:\/\/.+/.test(v), 'Enter a valid image URL')
      .optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
