import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export const { schemas: electionSchemas, $ref } = buildJsonSchemas({
  loginSchema,
  loginResponseSchema,
});
