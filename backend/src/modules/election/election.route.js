import {
  getStatus,
  getCandidates,
  startElection,
  stopElection,
  login,
  logout,
} from "./election.controller.js";
import { $ref } from "./election.schema.js";

export async function electionRoutes(app) {
  app.get(
    "/candidates",
    {
      preHandler: [app.authenticate],
    },
    getCandidates
  );
  app.post(
    "/start",
    {
      preHandler: [app.authenticate],
    },
    startElection
  );
  app.post(
    "/stop",
    {
      preHandler: [app.authenticate],
    },
    stopElection
  );

  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          201: $ref("loginResponseSchema"),
        },
      },
    },
    login
  );
  app.delete("/logout", { preHandler: [app.authenticate] }, logout);

  app.get(
    "/status",
    {
      preHandler: [app.authenticate],
    },
    getStatus
  );

  app.log.info("election routes registered");
}
