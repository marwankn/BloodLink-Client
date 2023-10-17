import NavBar from "../../components/NavBar/Navbar";
import SummaryRequestsCard from "../../components/SummaryRequestsCard/SummaryRequestsCard";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import "./DashboardPage.scss";
const DashboardPage = () => {
  return (
    <>
      <div className="dashboard">
        <SummaryCard />
        <SummaryRequestsCard />
      </div>
    </>
  );
};

export { DashboardPage };
