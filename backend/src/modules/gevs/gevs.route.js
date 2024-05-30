import { getConstituencies, getElectionResults } from "./gevs.controller.js";

export async function gevsRoutes(app) {
  app.get("/constituency/:name", getConstituencies);
  app.get("/results", getElectionResults);
  app.log.info("gevs routes registered");
}
