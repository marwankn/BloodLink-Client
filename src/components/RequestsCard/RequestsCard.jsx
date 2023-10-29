import { useState } from "react";
import { Link } from "react-router-dom";
import "./RequestsCard.scss";
import MedicalCircle from "../../assets/icons/MedicalCircle";
import CreateRequestForm from "../CreateRequestForm/CreateRequestForm";
import RequestsDetails from "../RequestsDetails/RequestsDetails";

export default function RequestsCard({ data }) {
  const [newRequest, setNewRequest] = useState(false);

  const toggleNewRequest = () => {
    setNewRequest(!newRequest);
  };

  return (
    <>
      <section className="requestsCard">
        <div className="requestsCard__header">
          <h2>Requests</h2>
          <Link
            className="requestsCard__header-link"
            onClick={toggleNewRequest}
          >
            <MedicalCircle className="requestsCard__header-link--icon" />
            <span className="requestsCard__header-link--text">New Request</span>
          </Link>
        </div>
        {newRequest && (
          <CreateRequestForm toggleNewRequest={() => toggleNewRequest()} />
        )}
        {!newRequest &&
          data.map((request) => {
            return <RequestsDetails request={request} />;
          })}
      </section>
    </>
  );
}
