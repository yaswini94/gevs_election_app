import { useEffect, useState } from "react";
import Client from "../../utils/axios";

const VoterDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [voter, setVoter] = useState([]);
  const [voteStatus, setVoteStatus] = useState(null);
  const [electionStatus, setElectionStatus] = useState(null);

  useEffect(() => {
    Client.get("/voter/candidates").then((response) => {
      setCandidates(response.data);
    });

    Client.get("/voter").then((response) => {
      setVoter(response.data);
    });

    Client.get("/voter/vote/status").then((response) => {
      setVoteStatus(response.data);
    });

    Client.get("/election/status").then((response) => {
      setElectionStatus(response.data);
    });
  }, []);

  const handleVote = (cid, pid) => {
    Client.post("/voter/vote", {
      candidate_id: cid,
      party_id: pid,
    }).then(() => {
      setVoteStatus({ voted: true });

      Client.get("/voter/vote/status").then((response) => {
        setVoteStatus(response.data);
      });
    });
  };

  return (
    <div>
      <h1>Voter Dashboard</h1>

      <div className="status-card-block">
        <div>
          <h2>Election Status</h2>
          <p>
            <strong>Status:</strong>{" "}
            {electionStatus?.status?.split("_").join(" ")}
          </p>
          {electionStatus?.status !== "NOT_STARTED" && (
            <>
              {(electionStatus?.status === "STARTED" ||
                electionStatus?.status === "ENDED") && (
                <p>
                  <strong>Start Date:</strong>
                  {new Date(electionStatus?.start_time).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              )}
              {electionStatus?.status === "ENDED" && (
                <p>
                  <strong>End Date:</strong>
                  {new Date(electionStatus?.end_time).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </>
          )}
        </div>

        <div>
          <h2>My Details</h2>
          <p>
            <strong>Name:</strong> {voter.full_name}
          </p>
          <p>
            <strong>Email:</strong> {voter.email}
          </p>
          <p>
            <strong>Constituency:</strong> {voter.constituency_name}
          </p>
        </div>
      </div>

      <div className="vote-status-block">
        <h2>Vote Status</h2>
        <p>
          <strong>Has Voted:</strong> {voteStatus?.voted ? "Yes" : "No"}
        </p>
        {voteStatus?.voted ? (
          <p>
            You have already voted. You cannot undo or change your vote now.
          </p>
        ) : electionStatus?.status === "NOT_STARTED" ? (
          <p>
            Election has not started yet. You can vote only when the election
            starts.
          </p>
        ) : electionStatus?.status === "ENDED" ? (
          <p>
            Election has ended. You cannot vote now. Please contact the election
            commission for more information.
          </p>
        ) : electionStatus?.status === "STARTED" ? (
          <p>
            You can vote now. Please vote for your favourite candidate from the
            list below.
          </p>
        ) : null}
      </div>

      <div className="vote-status-block candidates-block">
        <h2>Candidates</h2>
        <table className="vote-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Party</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.party_name}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleVote(candidate.id, candidate.party_id)}
                    disabled={
                      voteStatus?.voted || electionStatus?.status !== "STARTED"
                    }
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoterDashboard;
