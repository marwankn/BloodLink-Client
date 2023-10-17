import "./SummaryCard.scss";
import logo from "../../assets/group.png";
import redLogo from "../../assets/redLogo.png";

export default function SummaryCard() {
  const name = "Marwan";
  const bloodType = "A+";
  const numOfDonations = 3;
  const nextDonation = 82;
  return (
    <>
      <section className="summaryCard">
        <img src={redLogo} alt="" className="summaryCard__logo" />
        <div className="summaryCard__container">
          <h2 className="summaryCard__title">
            Hello, <span className="summaryCard__name">{name}</span>
          </h2>
          <div className="summaryCard__details">
            <div className="summaryCard__details-card">
              <h3>Blood Type</h3>
              <h2>{bloodType}</h2>
            </div>
            <div className="summaryCard__details-card">
              <h3>Number of Donation</h3>
              <h2>{numOfDonations}</h2>
            </div>
            <div className="summaryCard__details-card">
              <h3>Next Donation</h3>
              <h2>In {nextDonation} days</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
