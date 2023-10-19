import { Link } from "react-router-dom";
import "./SummaryRequestsCard.scss";
import { useEffect, useState } from "react";
import { getRequests } from "../../utils/apiUtils";

export default function SummaryRequestsCard() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    getRequests().then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setData(response.data.requests);
      }
    });
  }, []);

  return (
    <>
      <section className="SummaryRequestsCard">
        <h2>Recent Requests</h2>
        {data ? (
          data.map((request) => {
            if (request.donors_reponded === null) {
              request.donors_reponded = 0;
            }
            return (
              <Link
                className="SummaryRequestsCard__row"
                key={request.id}
                to={"/requests"}
              >
                <div className="SummaryRequestsCard__container">
                  <div className="SummaryRequestsCard__container-details">
                    <h3>Blood Type Needed</h3>
                    <h2>{request.blood_type_needed}</h2>
                  </div>
                  <div className="SummaryRequestsCard__container-details">
                    <h3>Donors Needed</h3>
                    <h2>{request.number_of_donors_needed}</h2>
                  </div>
                  <div className="SummaryRequestsCard__container-details">
                    <h3>Donors Responded</h3>
                    <h2>{request.donors_reponded}</h2>
                  </div>
                </div>
                <p className="SummaryRequestsCard__row-link">
                  More details &darr;
                </p>
              </Link>
            );
          })
        ) : (
          <h3>{message}</h3>
        )}
        <Link className="SummaryRequestsCard__link" to={"/requests"}>
          See all &gt;
        </Link>
      </section>
    </>
  );
}
