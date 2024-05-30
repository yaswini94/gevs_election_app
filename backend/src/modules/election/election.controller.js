import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js";

export async function login(req, reply) {
  const { email, password } = req.body;
  const electionCommissionOfficer =
    await prisma.electionCommissionOfficer.findUnique({
      where: { email: email },
    });

  const isMatch =
    electionCommissionOfficer &&
    (await bcrypt.compare(password, electionCommissionOfficer.password));
  if (!electionCommissionOfficer || !isMatch) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  const payload = {
    id: electionCommissionOfficer.id,
    email: electionCommissionOfficer.email,
    role: "admin",
  };
  const token = req.jwt.sign(payload);

  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });

  return { accessToken: token, role: "admin" };
}

export async function logout(req, reply) {
  reply.clearCookie("access_token");

  return reply.send({ message: "Logout successful" });
}

export async function getStatus(req, reply) {
  const status = await prisma.electionStatus.findUnique({
    where: {
      status_id: 1,
    },
  });

  return reply.code(200).send(status);
}

export async function getCandidates(req, reply) {
  const candidates = await prisma.candidate.findMany({
    include: {
      party: {
        select: {
          party_name: true,
        },
      },
      constituency: {
        select: {
          constituency_name: true,
        },
      },
    },
  });

  const results = candidates.map((candidate) => {
    return {
      id: candidate.id,
      name: candidate.name,
      party_id: candidate.party_id,
      constituency_id: candidate.constituency_id,
      party_name: candidate.party.party_name,
      constituency_name: candidate.constituency.constituency_name,
      vote_count: candidate.vote_count,
    };
  });

  return reply.send(results);
}

export async function startElection(req, reply) {
  const role = req?.user?.role;
  if (role !== "admin") {
    return reply.code(403).send({
      message: "You are not authorized to perform this action",
    });
  }

  const status = await prisma.electionStatus.update({
    where: {
      status_id: 1,
    },
    data: {
      status: "STARTED",
      start_time: new Date(),
    },
  });

  return reply.code(200).send(status);
}

export async function stopElection(req, reply) {
  const role = req?.user?.role;
  if (role !== "admin") {
    return reply.code(403).send({
      message: "You are not authorized to perform this action",
    });
  }

  const status = await prisma.electionStatus.update({
    where: {
      status_id: 1,
    },
    data: {
      status: "ENDED",
      end_time: new Date(),
    },
  });

  return reply.code(200).send(status);
}
