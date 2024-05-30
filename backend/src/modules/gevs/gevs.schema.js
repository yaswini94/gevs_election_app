import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const candidatesByConstituencyResponseSchema = z.object({
  constituency: z.string(),
  result: z.array(
    z.object({
      name: z.string(),
      party: z.string(),
      vote: z.number().int(),
    })
  ),
});

export const { schemas: gevsSchemas, $ref } = buildJsonSchemas({
  candidatesByConstituencyResponseSchema,
});
