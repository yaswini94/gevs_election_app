import { useEffect, useState } from "react";
import Client from "../../utils/axios";

const ElectionCommissionDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [electionStatus, setElectionStatus] = useState("");
  const [electionResults, setElectionResults] = useState([]);

  useEffect(() => {
    Client.get("/election/candidates")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => console.log(err));

    Client.get("/election/status")
      .then((res) => {
        setElectionStatus(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let interval = null;

    if (electionStatus?.status === "STARTED") {
      interval = setInterval(() => {
        Client.get("/election/candidates")
          .then((res) => {
            setCandidates(res.data);
          })
          .catch((err) => console.log(err));
      }, 5000);
    }

    if (electionStatus?.status === "ENDED") {
      Client.get("/gevs/results").then((res) => {
        setElectionResults(res.data);
      });
    }

    return () => clearInterval(interval);
  }, [electionStatus?.status]);

  const handleStartElection = () => {
    Client.post("/election/start")
      .then((res) => {
        setElectionStatus(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEndElection = () => {
    Client.post("/election/stop")
      .then((res) => {
        setElectionStatus(res.data);
      })
      .catch((err) => console.log(err));
  };

  const constituencyIdToNameMap = {};

  const candidatesByConstituencyId = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.constituency_id]) {
      constituencyIdToNameMap[candidate.constituency_id] =
        candidate.constituency_name;
      acc[candidate.constituency_id] = [];
    }
    acc[candidate.constituency_id].push(candidate);
    return acc;
  }, {});

  return (
    <div>
      <h1>Election Commission Dashboard</h1>

      <button
        className="form-btn small mr-24"
        type="button"
        onClick={handleStartElection}
        disabled={
          electionStatus?.status === "ENDED" ||
          electionStatus?.status === "STARTED"
        }
      >
        Start Election
      </button>
      <button
        className="form-btn small"
        type="button"
        onClick={handleEndElection}
        disabled={
          electionStatus?.status === "ENDED" ||
          electionStatus?.status === "NOT_STARTED"
        }
      >
        End Election
      </button>

      <h2>Election Status</h2>
      <p>{electionStatus?.status?.split("_")?.join(" ")}</p>

      {electionStatus?.status === "ENDED" && (
        <div className="border-top border-bottom">
          <h2>Election Results</h2>
          <h4>
            Winner:{" "}
            {electionResults?.winner?.toLowerCase() === "hung parliament"
              ? "Hung Parliament"
              : electionResults?.winner}
          </h4>
        </div>
      )}

      {electionStatus?.status === "STARTED" && (
        <p>
          Election has started. Realtime data will be shown in the below table
        </p>
      )}

      <h2>Candidates</h2>
      {Object.keys(candidatesByConstituencyId).map((constituencyId) => {
        return (
          <div key={constituencyId}>
            <h3>{constituencyIdToNameMap[constituencyId]}</h3>

            <table className="vote-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Party</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {candidatesByConstituencyId[constituencyId].map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.name}</td>
                    <td>{candidate.party_name}</td>
                    <td>{candidate.vote_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ElectionCommissionDashboard;
