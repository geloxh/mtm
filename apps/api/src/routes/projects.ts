import type { FastifyInstance } from "fastify";
import { prisma } from "@mtm/db";
import { requireAuth } from "../lib/auth";

export async function projectRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/workspaces/:id/projects", async (req) => {
    const { id } = req.params as any;
    return prisma.project.findMany({ where: { workspaceId: id, archived: false } });
  });

  app.post("/workspaces/:id/projects", async (req, reply) => {
    const { id } = req.params as any;
    const project = await prisma.project.create({ data: { ...(req.body as any), workspaceId: id } });
    return reply.status(201).send(project);
  });

  app.patch("/:id", async (req) => {
    const { id } = req.params as any;
    return prisma.project.update({ where: { id }, data: req.body as any });
  });

  app.delete("/:id", async (req, reply) => {
    const { id } = req.params as any;
    await prisma.project.delete({ where: { id } });
    return reply.status(204).send();
  });
}
