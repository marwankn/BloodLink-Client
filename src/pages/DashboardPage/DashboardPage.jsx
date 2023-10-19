import NavBar from "../../components/NavBar/Navbar";
import SummaryRequestsCard from "../../components/SummaryRequestsCard/SummaryRequestsCard";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import "./DashboardPage.scss";
const DashboardPage = ({ userProfile }) => {
  return (
    <>
      <div className="dashboard">
        <SummaryCard userProfile={userProfile} />
        <SummaryRequestsCard />
      </div>
    </>
  );
};

export { DashboardPage };
