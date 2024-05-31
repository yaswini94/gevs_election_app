import { LS } from "../../utils";
import ElectionCommissionDashboard from "./ElectionCommissionDashboard";
import VoterDashboard from "./VoterDashboard";

const Dashboard = () => {
  const role = LS.get("role");

  if (role === "admin") {
    return <ElectionCommissionDashboard />;
  }

  return <VoterDashboard />;
};

export default Dashboard;
