import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { authRoutes } from "./routes/auth";
import { workspaceRoutes } from "./routes/workspaces";
import { projectRoutes } from "./routes/projects";
import { taskRoutes } from "./routes/tasks";

const app = Fastify({ logger: true });

await app.register(cors, { origin: process.env.WEB_URL ?? "http://localhost:3000", credentials: true });
await app.register(cookie);
await app.register(jwt, { secret: process.env.JWT_SECRET! });

await app.register(authRoutes, { prefix: "/auth" });
await app.register(workspaceRoutes, { prefix: "/workspaces" });
await app.register(projectRoutes, { prefix: "/projects" });
await app.register(taskRoutes, { prefix: "/tasks" });

await app.listen({ port: 4000, host: "0.0.0.0" });
