# gevs_election_app

GEVS Election app implemented as a web application, to provide Shangri-La citizens with a platform to register as voters and cast the votes.
In addition, GEVS will provide open access to election data and statistics through its Open Data API. The general public, media, and any organisations will be able to access election data using a REST API.

# Requirements:

There are two types of accounts in GEVS: (1) Voter and (2) Election Commission Officer account.

**Voter:** Every voter must register first to be able to vote in the election. The details they need to provide are:
• Voter ID (email address)
• Full Name
• Date of Birth
• Password
• Constituency *
• An 8-digit Unique Voter Code (UVC) *

Every eligible Shangri-La voter has received a Poll Card via post. Each Poll Card contains a distinct 8-digit Voter Code (UVC). To complete the registration process, a voter must enter a valid UVC number from list. Once the voter account is established, they can sign in and access the Voter Dashboard where:
• When the election starts, a voter can select exactly one candidate from their constituency as the Member of Parliament (MP) to represent their constituency.
• Every voter can only cast a single vote, and once it is submitted, they are unable to alter or redo their early ballot.

**Election Commission Officer:** There is only one pre-defined Election Commission Officer account, which has a login name “election@shangrila.gov.sr” and a default password “shangrila2024$”. Bear in mind that any passwords must be stored securely in the database. An Election Commission Officer can access the Election Commission Dashboard to:
• Start and end the election.
• Monitor real-time election results in each constituency, showing the vote count for each candidate.
• Upon the conclusion of voting:
  o Announce the winner of the election if a political party gains an overall majority(defined as winning over half of the MP seats).
  o Declare a "Hung Parliament" when no single political party secures an overall majority.

**Error handling:**
GEVS should display corresponding messages (error page or ajax message) when:
• UVC code does not match the record in the database during the registration process.
• Another user has already used the given UVC or has already scanned the QR code
• The provided email is already linked to another registered voter.
• Invalid username or password.

implement “GEVS Open Data REST API” according to the specification below:
1. Obtain the electoral district's vote count:

**HTTP request:**
  GET -> /gevs/constituency/northern-kunlun-mountain

**JSON Response:**
  {
    "constituency":"northern-kunlun-mountain",
    "result": [
      {
        "name":"candidate 1",
        "party":"Red Party",
        "vote":"4"
      },
      { 
        "name":"candidate 2",
        "party":"Blue Party",
        "vote":"2"
      },
      { 
        "name":"candidate 3",
        "party":"Yellow Party",
        "vote":"1"
      } 
    ]
  }


2. Return the election result by listing all MP seats won across all electoral districts for every political party.

**HTTP request:**
  GET -> /gevs/results

**JSON Response:**
  {
    "status": "Completed",
    "winner": "Red Party",
    "seats": [
      {
        "party": "Red Party", 
        "seat": "3"
      },
      {
        "party": "Blue Party",
        "seat": "1"
      },
      {
        "party": "Yellow Party", 
        "seat": "1"
      },
      {
        "seat": "0" 
      }
    ]
  }

* When the election is ongoing, status and winner should set as “Pending”; Show winner as "Hung Parliament" when no single political party secures an overall majority after the election ended.

**Constituency List:**
  Shangri-la-Town
  Northern-Kunlun-Mountain
  Western-Shangri-la
  Naboo-Vallery
  New-Felucia

**Party list:**
  Blue Party
  Red Party
  Yellow Party
  Independent*

*************************************************************************

Below is a list of all valid Shangri-la UVCs. Voters are required to enter one of the provided codes to complete the registration process.

HH64FWPE
BBMNS9ZJ
KYMK9PUH
WL3K3YPT
JA9WCMAS
Z93G7PN9
WPC5GEHA
RXLNLTA6
7XUFD78Y
DBP4GQBQ
ZSRBTK9S
B7DMPWCQ
YADA47RL
9GTZQNKB
KSM9NB5L
BQCRWTSG
ML5NSKKG
D5BG6FDH
2LJFM6PM
38NWLPY3
2TEHRTHJ
G994LD9T
Q452KVQE
75NKUXAH
DHKVCU8T
TH9A6HUB
2E5BHT5R
556JTA32
LUFKZAHW
DBAD57ZR
K96JNSXY
PFXB8QXM
8TEXF2HD
N6HBFD2X
K3EVS3NM
5492AC6V
U5LGC65X
BKMKJN5S
JF2QD3UF
NW9ETHS7
VFBH8W6W
7983XU4M
2GYDT5D3
LVTFN8G5
UNP4A5T7
UMT3RLVS
TZZZCJV8
UVE5M7FR
W44QP7XJ
9FCV9RMT


**********************************************************************************************************************

GEVS Election application is web application

1. For backend API and server we have used Fastify (NodeJS) framework along with SQLite DB with Prisma ORM.
   JSON Web Tokens for authentication mechanism.
2. For the frontend we have used ReactJS and custom CSS for UI

-------------------------------------------------------------------------------------------------------------

Steps to run Backend:

1. Go to the GEVS folder path
2. Run `cd backend` to go inside backend folder
3. Run `npm i` to install all the dependent libraries
4. Run `npm run seed` to initialize database
5. Run `npm start` to run the backend
6. Backend will be up and running in http:localhost/8000

-------------------------------------------------------------------------------------------------------------

Steps to RESET Database:

1. Go to the GEVS folder path
2. Run `cd backend` to go inside backend folder
3. Make sure you stop the running backend server with `ctrl + c`
4. Run `rm -rf prisma/db/data.db` to delete the Database.
5. Run `npm run seed` to create new Database file and initialize required tables and data.
6. Run `npm start` to run the backend
7. Backend will be up and running in http:localhost/8000

-------------------------------------------------------------------------------------------------------------

Steps to run Frontend:

1. Go to the GEVS folder path
2. Run `cd frontend` to go inside frontend folder
3. Run `npm i` to install all the dependent libraries
4. Run `npm start` to run the frontend.
5. Open google chrome browser and go to http://localhost:5137
6. Explore GEVS Election app with separate logins for both voters and Election Officer.

-------------------------------------------------------------------------------------------------------------

DEBUG Steps:
1. If you notice any issues with either frontend or backend server, please stop the running server.
2. Delete the `node_modules` folder in the respective folder.
3. Repeat the steps from above Backend or Frontend sections described above.
