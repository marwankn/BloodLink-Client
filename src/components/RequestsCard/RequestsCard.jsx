import { Link } from "react-router-dom";
import "./RequestsCard.scss";
import { useState } from "react";
import ActivityHeart from "../../assets/icons/activityHeart";
import CheckHeart from "../../assets/icons/CheckHeart";
import MedicalCircle from "../../assets/icons/MedicalCircle";
import CreateRequestForm from "..//CreateRequestForm/CreateRequestForm";

export default function RequestsCard() {
  const [expanded, setExpanded] = useState(false);
  const [responded, setResponded] = useState(false);
  const [donated, setDonated] = useState(false);
  const [newRequest, setNewRequest] = useState(false);
  const bloodType = "A+";
  const numOfDonations = 3;
  const nextDonation = 82;
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const toggleResponded = () => {
    setDonated(false);
    setResponded(!responded);
  };
  const toggleDonated = () => {
    setResponded(false);
    setDonated(!donated);
  };
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
        {!newRequest && (
          <div className="requestsCard__row-outer">
            <div className="requestsCard__row-inner" onClick={toggleExpanded}>
              <div className="requestsCard__container">
                <div className="requestsCard__container-details">
                  <h3>Blood Type Needed</h3>
                  <h2>{bloodType}</h2>
                </div>
                <div className="requestsCard__container-details">
                  <h3>Donors Needed</h3>
                  <h2>{numOfDonations}</h2>
                </div>
                <div className="requestsCard__container-details">
                  <h3>Donors Responded</h3>
                  <h2>In {nextDonation} days</h2>
                </div>
              </div>

              {expanded && (
                <div className="requestsCard__container">
                  <div className="requestsCard__container-details">
                    <h3>Blood Type Needed</h3>
                    <h2>{bloodType}</h2>
                  </div>
                  <div className="requestsCard__container-details">
                    <h3>Donors Needed</h3>
                    <h2>{numOfDonations}</h2>
                  </div>
                  <div className="requestsCard__container-details">
                    <h3>Donors Responded</h3>
                    <h2>In {nextDonation} days</h2>
                  </div>
                </div>
              )}
              <p className="requestsCard__row-link">
                {expanded ? "Less details" : `More details`}
              </p>
            </div>
            <div className="requestsCard__buttons">
              <button
                onClick={toggleResponded}
                type="button"
                className={
                  responded
                    ? "requestsCard__button requestsCard__button--clicked"
                    : "requestsCard__button"
                }
              >
                <ActivityHeart stroke={responded ? "white" : "black"} /> I'll be
                there
              </button>
              <button
                onClick={toggleDonated}
                type="button"
                className={
                  donated
                    ? "requestsCard__button requestsCard__button--clicked"
                    : "requestsCard__button"
                }
              >
                <CheckHeart stroke={donated ? "white" : "black"} /> Donated
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
