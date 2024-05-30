import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createVotersSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  dob: z.string(),
  uvc: z.string().min(8),
  constituency_id: z.number().int(),
});

const createVotersResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  full_name: z.string(),
  constituency_id: z.number().int(),
});

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

const createVoteSchema = z.object({
  candidate_id: z.number().int(),
  party_id: z.number().int(),
});

const createVoteResponseSchema = z.object({
  canid: z.number().int(),
  party_id: z.number().int(),
  voter_id: z.number().int(),
  constituency_id: z.number().int(),
});

export const { schemas: votersSchemas, $ref } = buildJsonSchemas({
  createVotersSchema,
  createVotersResponseSchema,
  loginSchema,
  loginResponseSchema,
  createVoteSchema,
  createVoteResponseSchema,
});
