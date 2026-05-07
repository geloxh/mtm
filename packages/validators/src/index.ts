import { z } from 'zod'

export const registerSchema = z.object({
  email:       z.string().email(),
  password:    z.string().min(8),
  displayName: z.string().min(2),
})

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string(),
})

export const createTaskSchema = z.object({
  title:       z.string().min(1).max(255),
  description: z.string().optional(),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  dueDate:     z.string().datetime().optional(),
  assigneeId:  z.string().uuid().optional(),
})

export const createProjectSchema = z.object({
  name:  z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
})

export type RegisterInput     = z.infer<typeof registerSchema>
export type LoginInput        = z.infer<typeof loginSchema>
export type CreateTaskInput   = z.infer<typeof createTaskSchema>
export type CreateProjectInput = z.infer<typeof createProjectSchema>
