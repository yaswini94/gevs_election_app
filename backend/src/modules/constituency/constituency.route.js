import { getConstituencies } from "./constituency.controller.js";

export async function constituenciesRoutes(app) {
  app.get("/constituencies", {}, getConstituencies);
}
