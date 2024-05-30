import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js";

const SALT_ROUNDS = 10;

export async function createVoters(req, reply) {
  const { password, email, full_name, dob, constituency_id, uvc } = req.body;

  const voter = await prisma.voter.findUnique({
    where: {
      email: email,
    },
  });
  if (voter) {
    return reply.code(401).send({
      message: "Voter is already registered",
    });
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const uvcCode = await prisma.uvcCode.findUnique({
      where: {
        uvc: uvc,
      },
    });

    if (!uvcCode) {
      return reply.code(401).send({
        message: "Invalid unique voter code",
      });
    }

    if (uvcCode.used) {
      return reply.code(401).send({
        message: "Unique voter code already used",
      });
    }

    const voter = await prisma.voter.create({
      data: {
        password: hash,
        email,
        full_name,
        dob,
        constituency_id,
        uvc,
      },
    });

    await prisma.uvcCode.update({
      where: {
        uvc: uvc,
      },
      data: {
        used: true,
      },
    });

    return reply.code(201).send(voter);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function login(req, reply) {
  const { email, password } = req.body;
  const voter = await prisma.voter.findUnique({ where: { email: email } });

  const isMatch = voter && (await bcrypt.compare(password, voter.password));
  if (!voter || !isMatch) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }

  const payload = {
    id: voter.id,
    email: voter.email,
    name: voter.name,
    constituency_id: voter.constituency_id,
    role: "voter",
  };
  const token = req.jwt.sign(payload);

  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });

  return { accessToken: token, role: "voter" };
}

export async function logout(req, reply) {
  reply.clearCookie("access_token");

  return reply.send({ message: "Logout successful" });
}

export async function getCandidates(req, reply) {
  const { constituency_id } = req.user;

  if (!constituency_id) {
    return reply.code(401).send({
      message: "Invalid constituency",
    });
  }

  const candidates = await prisma.candidate.findMany({
    where: {
      constituency_id: constituency_id,
    },
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
      id: candidate.canid,
      name: candidate.name,
      party_name: candidate.party.party_name,
      party_id: candidate.party_id,
      constituency: candidate.constituency.constituency_name,
      constituency_id: candidate.constituency_id,
    };
  });

  return reply.send(results);
}

export async function createVote(req, reply) {
  const { id, constituency_id } = req.user;
  const { candidate_id, party_id } = req.body;

  if (!constituency_id) {
    return reply.code(401).send({
      message: "Invalid constituency",
    });
  }

  if (!candidate_id) {
    return reply.code(401).send({
      message: "Invalid candidate",
    });
  }

  const vote = await prisma.vote.findFirst({
    where: {
      voter_id: id,
    },
  });

  if (vote) {
    return reply.code(401).send({
      message: "Voter already voted",
    });
  }

  try {
    await prisma.vote.create({
      data: {
        voter_id: id,
        canid: candidate_id,
        party_id,
        constituency_id,
      },
    });

    await prisma.candidate.update({
      where: {
        canid: candidate_id,
      },
      data: {
        vote_count: {
          increment: 1,
        },
      },
    });

    return reply.code(201).send({
      message: "Vote successful",
    });
  } catch (e) {
    return reply.code(500).send(e);
  }
}

export async function getVoteStatus(req, reply) {
  const { id } = req.user;

  const vote = await prisma.vote.findFirst({
    where: {
      voter_id: id,
    },
  });

  if (vote) {
    return reply.send({
      voted: true,
    });
  }

  return reply.send({
    voted: false,
  });
}

export const getVoterDetails = async (req, reply) => {
  const { id } = req.user;

  const voter = await prisma.voter.findUnique({
    where: {
      id: id,
    },
    include: {
      constituency: {
        select: {
          constituency_name: true,
        },
      },
    },
  });

  const results = {
    id: voter.id,
    full_name: voter.full_name,
    email: voter.email,
    dob: voter.dob,
    constituency_id: voter.constituency_id,
    constituency_name: voter.constituency.constituency_name,
  };

  return reply.send(results);
};
