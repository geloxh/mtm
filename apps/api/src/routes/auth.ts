import type { FastifyInstance } from "fastify";
import { prisma } from "@mtm/db";
import bcrypt from "bcryptjs";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (req, reply) => {
    const { email, password, fullName } = req.body as any;
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, fullName, passwordHash: hashed } });
    const token = app.jwt.sign({ sub: user.id });
    return reply.send({ token });
  });

  app.post("/login", async (req, reply) => {
    const { email, password } = req.body as any;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash!)))
      return reply.status(401).send({ error: "Invalid credentials" });
    const token = app.jwt.sign({ sub: user.id });
    return reply.send({ token });
  });

  app.get("/me", { preHandler: [async (req, reply) => { try { await req.jwtVerify() } catch { reply.status(401).send({ error: "Unauthorized" }) } }] }, async (req) => {
    const { sub } = req.user as any;
    return prisma.user.findUnique({ where: { id: sub }, select: { id: true, email: true, fullName: true, avatarUrl: true } });
  });
}
