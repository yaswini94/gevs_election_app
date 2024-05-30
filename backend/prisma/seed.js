import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  // this will delete all data in the database
  await prisma.voter.deleteMany({});
  await prisma.candidate.deleteMany({});
  await prisma.constituency.deleteMany({});
  await prisma.party.deleteMany({});
  await prisma.uvcCode.deleteMany({});
  await prisma.electionCommissionOfficer.deleteMany({});
  await prisma.electionStatus.deleteMany({});

  const SALT_ROUNDS = 10;
  const hash = await bcrypt.hash("shangrila2024$", SALT_ROUNDS);
  // create all table data
  await prisma.electionCommissionOfficer.create({
    data: {
      email: "election@shangrila.gov.sr",
      password: hash,
    },
  });

  await prisma.electionStatus.create({
    data: {
      status_id: 1,
      status: "NOT_STARTED",
    },
  });

  const constituencies = [
    { constituency_id: 1, constituency_name: "Shangri-la-Town" },
    { constituency_id: 2, constituency_name: "Northern-Kunlun-Mountain" },
    { constituency_id: 3, constituency_name: "Western-Shangri-la" },
    { constituency_id: 4, constituency_name: "Naboo-Vallery" },
    { constituency_id: 5, constituency_name: "New-Felucia" },
  ];
  for (const constituency of constituencies) {
    await prisma.constituency.create({ data: constituency });
  }

  const parties = [
    { party_id: 1, party_name: "Blue Party" },
    { party_id: 2, party_name: "Red Party" },
    { party_id: 3, party_name: "Yellow Party" },
    { party_id: 4, party_name: "Independent" },
  ];

  for (const party of parties) {
    await prisma.party.create({ data: party });
  }

  const uvcCodes = [
    { uvc: "2E5BHT5R", used: false },
    { uvc: "2GYDT5D3", used: false },
    { uvc: "2LJFM6PM", used: false },
    { uvc: "2TEHRTHJ", used: false },
    { uvc: "38NWLPY3", used: false },
    { uvc: "5492AC6V", used: false },
    { uvc: "556JTA32", used: false },
    { uvc: "75NKUXAH", used: false },
    { uvc: "7983XU4M", used: false },
    { uvc: "7XUFD78Y", used: false },
    { uvc: "8TEXF2HD", used: false },
    { uvc: "9FCV9RMT", used: false },
    { uvc: "9GTZQNKB", used: false },
    { uvc: "B7DMPWCQ", used: false },
    { uvc: "BBMNS9ZJ", used: false },
    { uvc: "BKMKJN5S", used: false },
    { uvc: "BQCRWTSG", used: false },
    { uvc: "D5BG6FDH", used: false },
    { uvc: "DBAD57ZR", used: false },
    { uvc: "DBP4GQBQ", used: false },
    { uvc: "DHKVCU8T", used: false },
    { uvc: "G994LD9T", used: false },
    { uvc: "HH64FWPE", used: false },
    { uvc: "JA9WCMAS", used: false },
    { uvc: "JF2QD3UF", used: false },
    { uvc: "K3EVS3NM", used: false },
    { uvc: "K96JNSXY", used: false },
    { uvc: "KSM9NB5L", used: false },
    { uvc: "KYMK9PUH", used: false },
    { uvc: "LUFKZAHW", used: false },
    { uvc: "LVTFN8G5", used: false },
    { uvc: "ML5NSKKG", used: false },
    { uvc: "N6HBFD2X", used: false },
    { uvc: "NW9ETHS7", used: false },
    { uvc: "PFXB8QXM", used: false },
    { uvc: "Q452KVQE", used: false },
    { uvc: "RXLNLTA6", used: false },
    { uvc: "TH9A6HUB", used: false },
    { uvc: "TZZZCJV8", used: false },
    { uvc: "U5LGC65X", used: false },
    { uvc: "UMT3RLVS", used: false },
    { uvc: "UNP4A5T7", used: false },
    { uvc: "UVE5M7FR", used: false },
    { uvc: "VFBH8W6W", used: false },
    { uvc: "W44QP7XJ", used: false },
    { uvc: "WL3K3YPT", used: false },
    { uvc: "WPC5GEHA", used: false },
    { uvc: "YADA47RL", used: false },
    { uvc: "Z93G7PN9", used: false },
    { uvc: "ZSRBTK9S", used: false },
  ];

  for (const uvc of uvcCodes) {
    await prisma.uvcCode.create({ data: uvc });
  }

  const candidates = [
    {
      canid: 1,
      name: "Candidate 1",
      party_id: 1,
      constituency_id: 1,
      vote_count: 0,
    },
    {
      canid: 2,
      name: "Candidate 2",
      party_id: 2,
      constituency_id: 1,
      vote_count: 0,
    },
    {
      canid: 3,
      name: "Candidate 3",
      party_id: 3,
      constituency_id: 1,
      vote_count: 0,
    },
    {
      canid: 4,
      name: "Candidate 4",
      party_id: 4,
      constituency_id: 1,
      vote_count: 0,
    },
    {
      canid: 5,
      name: "Candidate 5",
      party_id: 1,
      constituency_id: 2,
      vote_count: 0,
    },
    {
      canid: 6,
      name: "Candidate 6",
      party_id: 2,
      constituency_id: 2,
      vote_count: 0,
    },
    {
      canid: 7,
      name: "Candidate 7",
      party_id: 3,
      constituency_id: 2,
      vote_count: 0,
    },
    {
      canid: 8,
      name: "Candidate 8",
      party_id: 4,
      constituency_id: 2,
      vote_count: 0,
    },
    {
      canid: 9,
      name: "Candidate 9",
      party_id: 1,
      constituency_id: 3,
      vote_count: 0,
    },
    {
      canid: 10,
      name: "Candidate 10",
      party_id: 2,
      constituency_id: 3,
      vote_count: 0,
    },
    {
      canid: 11,
      name: "Candidate 11",
      party_id: 3,
      constituency_id: 3,
      vote_count: 0,
    },
    {
      canid: 12,
      name: "Candidate 12",
      party_id: 4,
      constituency_id: 3,
      vote_count: 0,
    },
    {
      canid: 13,
      name: "Candidate 13",
      party_id: 1,
      constituency_id: 4,
      vote_count: 0,
    },
    {
      canid: 14,
      name: "Candidate 14",
      party_id: 2,
      constituency_id: 4,
      vote_count: 0,
    },
    {
      canid: 15,
      name: "Candidate 15",
      party_id: 3,
      constituency_id: 4,
      vote_count: 0,
    },
    {
      canid: 16,
      name: "Candidate 16",
      party_id: 4,
      constituency_id: 4,
      vote_count: 0,
    },
    {
      canid: 17,
      name: "Candidate 17",
      party_id: 1,
      constituency_id: 5,
      vote_count: 0,
    },
    {
      canid: 18,
      name: "Candidate 18",
      party_id: 2,
      constituency_id: 5,
      vote_count: 0,
    },
    {
      canid: 19,
      name: "Candidate 19",
      party_id: 3,
      constituency_id: 5,
      vote_count: 0,
    },
    {
      canid: 20,
      name: "Candidate 20",
      party_id: 4,
      constituency_id: 5,
      vote_count: 0,
    },
  ];

  for (const candidate of candidates) {
    await prisma.candidate.create({ data: candidate });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
