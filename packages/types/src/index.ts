export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'
export type Priority   = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface User {
  id: string
  email: string
  displayName: string
}

export interface Project {
  id: string
  name: string
  color?: string
  archived: boolean
  workspaceId: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  dueDate?: string
  position: number
  assignee?: User
  parentTaskId?: string
}

export interface Comment {
  id: string
  taskId: string
  userId: string
  body: string
  createdAt: string
}
