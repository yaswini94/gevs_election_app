import prisma from "../../utils/prisma.js";
import { getCandidatesMapByConstituency } from "./utils.js";

export async function getConstituencies(req, reply) {
  const { name } = req.params;

  const constituency = await prisma.constituency.findFirst({
    where: {
      constituency_name: {
        contains: name.toLowerCase(),
      },
    },
  });

  if (!constituency) {
    return reply.code(401).send({
      message: "Invalid constituency",
    });
  }

  const candidatesByConstituency = await prisma.candidate.findMany({
    where: {
      constituency_id: constituency.constituency_id,
    },
    include: {
      party: true,
    },
  });

  const results = {
    constituency: constituency.constituency_name,
    result: candidatesByConstituency.map((candidate) => {
      return {
        name: candidate.name,
        party: candidate.party.party_name,
        vote: candidate.vote_count,
      };
    }),
  };

  return reply.send(results);
}

export async function getElectionResults(req, reply) {
  const election = await prisma.electionStatus.findUnique({
    where: {
      status_id: 1,
    },
  });
  if (election?.status !== "ENDED") {
    const results = {
      status: "Pending",
      winner: "Pending",
      seats: [],
    };

    return reply.send(results);
  }

  const candidates = await prisma.candidate.findMany({
    include: {
      party: true,
    },
  });

  const constituencyMapByCandidate = getCandidatesMapByConstituency(candidates);
  const seats = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  const parties = await prisma.party.findMany();
  const partyNamesMap = parties.reduce((acc, party) => {
    acc[party.party_id] = party.party_name;
    return acc;
  }, {});

  Object.keys(constituencyMapByCandidate).forEach((constituency) => {
    const _parties = constituencyMapByCandidate[constituency];

    _parties.sort((a, b) => {
      return b.vote - a.vote;
    });

    if (_parties[0].vote > 0 && _parties[0].vote > _parties[1].vote) {
      seats[_parties[0].party_id] += 1;
    }
  });

  let winnerId = null;
  const totalConstituencies = Object.keys(constituencyMapByCandidate).length;
  Object.keys(seats).forEach((pid) => {
    if (seats[pid] >= Math.ceil(totalConstituencies / 2)) {
      winnerId = pid;
    }
  });

  const results = {
    status: "Completed",
    winner: winnerId ? partyNamesMap[winnerId] : "Hung Parliament",
    seats: Object.keys(seats).map((pid) => {
      return {
        party: partyNamesMap[pid],
        seat: seats[pid],
      };
    }),
  };

  return reply.send(results);
}
