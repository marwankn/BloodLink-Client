import NavBar from "../../components/NavBar/Navbar";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import "./DashboardPage.scss";
const DashboardPage = () => {
  return (
    <>
      <div className="dashboard">
        <SummaryCard />
      </div>
    </>
  );
};

export { DashboardPage };
