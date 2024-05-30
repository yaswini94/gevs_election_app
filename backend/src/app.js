import Fastify from "fastify";
import fjwt from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import cors from '@fastify/cors'

import { votersRoutes } from "./modules/voter/voter.route.js";
import { votersSchemas } from "./modules/voter/voter.schema.js";
import { constituenciesRoutes } from "./modules/constituency/constituency.route.js";
import { constituencySchemas } from "./modules/constituency/constituency.schema.js";
import { electionRoutes } from "./modules/election/election.route.js";
import { electionSchemas } from "./modules/election/election.schema.js";
import { gevsRoutes } from "./modules/gevs/gevs.route.js";
import { gevsSchemas } from "./modules/gevs/gevs.schema.js";

const app = Fastify({ logger: true });
await app.register(cors, { origin: "*" });

app.get("/healthcheck", (req, res) => {
  res.send({ message: "Success" });
});

for (let schema of [
  ...votersSchemas,
  ...constituencySchemas,
  ...electionSchemas,
  ...gevsSchemas,
]) {
  if (!app.getSchemas()[schema.$id]) {
    app.addSchema(schema);
  }
}

app.register(fjwt, { secret: "yaswinisverysupersecrettokenhere" });
app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});
app.decorate("authenticate", async (req, reply) => {
  const token = req.cookies.access_token;

  const authorizationHeader = req?.headers?.authorization;
  const jwtToken = authorizationHeader?.split(" ")[1];

  if (!token && !jwtToken) {
    return reply.status(401).send({ message: "Authentication required" });
  }

  const decoded = await req.jwt.verify(token || jwtToken);
  req.user = decoded;
});

app.register(fCookie, {
  secret: "some-secret-key",
  hook: "preHandler",
});

app.register(votersRoutes, { prefix: "/voter" });
app.register(constituenciesRoutes, { prefix: "/" });
app.register(electionRoutes, { prefix: "/election" });
app.register(gevsRoutes, { prefix: "/gevs" });

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

async function main() {
  await app.listen({
    port: 8000,
    host: "0.0.0.0",
  });
}

main();
