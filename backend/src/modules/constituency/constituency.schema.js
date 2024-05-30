import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const getConstituencySchema = z.object({
  constituency_id: z.number().int(),
  constituency_name: z.string(),
});

export const { schemas: constituencySchemas, $ref } = buildJsonSchemas({
  getConstituencySchema,
});
