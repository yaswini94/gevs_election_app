-- CreateTable
CREATE TABLE "Voter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "uvc" TEXT NOT NULL,
    "constituency_id" INTEGER NOT NULL,
    CONSTRAINT "Voter_constituency_id_fkey" FOREIGN KEY ("constituency_id") REFERENCES "Constituency" ("constituency_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Candidate" (
    "canid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "constituency_id" INTEGER NOT NULL,
    "party_id" INTEGER NOT NULL,
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Candidate_constituency_id_fkey" FOREIGN KEY ("constituency_id") REFERENCES "Constituency" ("constituency_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidate_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "Party" ("party_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Constituency" (
    "constituency_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "constituency_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Party" (
    "party_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "party_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UvcCode" (
    "uvc" TEXT NOT NULL PRIMARY KEY,
    "used" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "ElectionCommissionOfficer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectionStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "start_time" DATETIME,
    "end_time" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Voter_email_key" ON "Voter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ElectionCommissionOfficer_email_key" ON "ElectionCommissionOfficer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ElectionStatus_status_id_key" ON "ElectionStatus"("status_id");
