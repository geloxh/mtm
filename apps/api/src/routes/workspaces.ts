import type { FastifyInstance } from "fastify";
import { prisma } from "@mtm/db";
import { requireAuth } from "../lib/auth";

export async function workspaceRoutes(app: FastifyInstance) {
  app.addHook("preHandler", requireAuth);

  app.get("/", async (req) => {
    const { sub } = req.user as any;
    return prisma.workspace.findMany({ where: { members: { some: { userId: sub } } } });
  });

  app.post("/", async (req, reply) => {
    const { sub } = req.user as any;
    const { name, slug } = req.body as any;
    const ws = await prisma.workspace.create({
      data: { name, slug, ownerId: sub, members: { create: { userId: sub, role: "OWNER" } } },
    });
    return reply.status(201).send(ws);
  });

  app.get("/:slug", async (req) => {
    const { slug } = req.params as any;
    return prisma.workspace.findUnique({ where: { slug }, include: { members: { include: { user: true } } } });
  });

  app.patch("/:id", async (req) => {
    const { id } = req.params as any;
    return prisma.workspace.update({ where: { id }, data: req.body as any });
  });

  app.delete("/:id", async (req, reply) => {
    const { id } = req.params as any;
    await prisma.workspace.delete({ where: { id } });
    return reply.status(204).send();
  });
}
