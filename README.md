### mtm (My Task Manager)
Maintainable and scalable application and web app task manager project for professional documentation and leveraging productivity accomplishments.

### Project Structure

```
mtm/
├── apps/
│   ├── web/          # Next.js (browser)
│   ├── api/          # Fastify (backend)
│   ├── mobile/       # Capacitor (IOS/Android)
│   └── desktop/      # Tauri (Win/Mac/Linux)
├── packages/
│   ├── types/        # Shared Typescript types
│   ├── db/           # Prisma schema + client
│   └── ui/           # Shared components
├── package.json
└── turbo.json
```

### Tech Stack
- ***Web*** : Next.js + TypeScript
- ***Mobile*** : Capacitor
- ***Desktop*** : Tauri
- ***Backend*** : Fastify
- ***Database*** : PostgreSQL + Prisma
- ***Auth*** : Clerk
- ***Real-time*** : Supabase Realtime
- ***File storage*** : Supabase storage or S3
- ***UI Components*** : shadcn/uiv + React
- ***State*** : TanStack Query + Zustand
- ***Deployment*** : Vercel + Fly.io(API)


### Features
***Layer 1***
- ***Auth***
Sign up / login / logout
OAuth
Invite teammates via email
- ***Workspaces***
Create / switch workspaces
Member roles (Owner, Admin, Member, Guest)

- ***Projects***
Create / achive projects
Project color and icon

- ***Tasks***
Create, edit, delete tasks
Title, description
Status, priority, dues date
Assignee
SUbtaska
Tags / labels
Drag-and-Drop reordering

- ***Views***
Kanban board
List view
Search across all tasks

***Layer 2***
Comments on tasks
File attachments
Activity feed
Notifications
Keyboard shortcuts
Dark mode
Due date reminders
Filter & sort tasks

***Layer 3***
Calendar view
Time tracking
Dashboard / analytics
Push notifications (mobile)
Offline mode (mobile + desktop)
Export to CSV / PDF
Mentions (@user in comments)