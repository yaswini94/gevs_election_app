import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getConstituencies = async (request, reply) => {
  const constituencies = await prisma.constituency.findMany();
  return reply.send(constituencies);
};
