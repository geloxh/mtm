export type { User, Workspace, WorkspaceMember, Project, Task, Tag, Comment, Attachment } from "@mtm/db";
export type { Role, TaskStatus, Priority } from "@mtm/db";

// API response wrappers
export type ApiResponse<T> = { data: T; error: null } | { data: null; error: string };

// Task with relations (common query shape)
export type TaskWithRelations = import("@mtm/db").Task & {
  assignee: import("@mtm/db").User | null;
  tags: import("@mtm/db").Tag[];
  subtasks: import("@mtm/db").Task[];
  _count: { comments: number; attachments: number };
};
