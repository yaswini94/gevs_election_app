import {
  createVoters,
  createVote,
  getVoteStatus,
  getCandidates,
  getVoterDetails,
  login,
  logout,
} from "./voter.controller.js";
import { $ref } from "./voter.schema.js";

export async function votersRoutes(app) {
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    getVoterDetails
  );

  app.get(
    "/candidates",
    {
      preHandler: [app.authenticate],
    },
    getCandidates
  );

  app.post(
    "/vote",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("createVoteSchema"),
      },
    },
    createVote
  );

  app.get(
    "/vote/status",
    {
      preHandler: [app.authenticate],
    },
    getVoteStatus
  );

  app.post(
    "/register",
    {
      schema: {
        body: $ref("createVotersSchema"),
        response: {
          201: $ref("createVotersResponseSchema"),
        },
      },
    },
    createVoters
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

  app.log.info("voters routes registered");
}
