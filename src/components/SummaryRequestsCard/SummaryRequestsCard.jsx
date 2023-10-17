import { Link } from "react-router-dom";
import "./SummaryRequestsCard.scss";

export default function SummaryRequestsCard() {
  const name = "Marwan";
  const bloodType = "A+";
  const numOfDonations = 3;
  const nextDonation = 82;

  return (
    <>
      <section className="SummaryRequestsCard">
        <h2>Recent Requests</h2>
        <Link className="SummaryRequestsCard__row">
          <div className="SummaryRequestsCard__container">
            <div className="SummaryRequestsCard__container-details">
              <h3>Blood Type Needed</h3>
              <h2>{bloodType}</h2>
            </div>
            <div className="SummaryRequestsCard__container-details">
              <h3>Donors Needed</h3>
              <h2>{numOfDonations}</h2>
            </div>
            <div className="SummaryRequestsCard__container-details">
              <h3>Donors Responded</h3>
              <h2>In {nextDonation} days</h2>
            </div>
          </div>
          <p className="SummaryRequestsCard__row-link">More details &darr;</p>
        </Link>
        <Link className="SummaryRequestsCard__link" to={"/requests"}>
          See all &gt;
        </Link>
      </section>
    </>
  );
}
