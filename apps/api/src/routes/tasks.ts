import type { FastifyInstance } from "fastify";
import { prisma } from "@mtm/db";
import { requireAuth } from "../lib/auth";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/projects/:id/tasks", async (req) => {
    const { id } = req.params as any;
    return prisma.task.findMany({
      where: { projectId: id, parentTaskId: null },
      include: { assignee: true, tags: true, subtasks: true, _count: { select: { comments: true } } },
      orderBy: { position: "asc" },
    });
  });

  app.post("/projects/:id/tasks", async (req, reply) => {
    const { id } = req.params as any;
    const { sub } = req.user as any;
    const last = await prisma.task.findFirst({ where: { projectId: id }, orderBy: { position: "desc" } });
    const task = await prisma.task.create({
      data: { ...(req.body as any), projectId: id, creatorId: sub, position: (last?.position ?? 0) + 1000 },
    });
    return reply.status(201).send(task);
  });

  app.get("/:id", async (req) => {
    const { id } = req.params as any;
    return prisma.task.findUnique({
      where: { id },
      include: { assignee: true, tags: true, subtasks: true, comments: { include: { author: true } }, attachments: true },
    });
  });

  app.patch("/:id", async (req) => {
    const { id } = req.params as any;
    return prisma.task.update({ where: { id }, data: req.body as any });
  });

  app.delete("/:id", async (req, reply) => {
    const { id } = req.params as any;
    await prisma.task.delete({ where: { id } });
    return reply.status(204).send();
  });

  app.patch("/:id/move", async (req) => {
    const { id } = req.params as any;
    const { position, projectId } = req.body as any;
    return prisma.task.update({ where: { id }, data: { position, projectId } });
  });
}