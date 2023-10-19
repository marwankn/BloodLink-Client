import "./SummaryCard.scss";
import logo from "../../assets/group.png";
import redLogo from "../../assets/redLogo.png";

export default function SummaryCard({ userProfile }) {
  return (
    <>
      <section className="summaryCard">
        <img src={redLogo} alt="" className="summaryCard__logo" />
        <div className="summaryCard__container">
          <h2 className="summaryCard__title">
            Hello,{" "}
            <span className="summaryCard__name">{userProfile.first_name}</span>
          </h2>
          <div className="summaryCard__details">
            <div className="summaryCard__details-card">
              <h3>Blood Type</h3>
              <h2>{userProfile.blood_type}</h2>
            </div>
            <div className="summaryCard__details-card">
              <h3>Number of Donation</h3>
              <h2>{userProfile.number_of_donations}</h2>
            </div>
            <div className="summaryCard__details-card">
              <h3>Next Donation</h3>
              <h2>{userProfile.daysLeft}</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
