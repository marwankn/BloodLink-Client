import { Link } from "react-router-dom";
import "./RequestsCard.scss";
import { useState } from "react";
import ActivityHeart from "../../assets/icons/activityHeart";
import CheckHeart from "../../assets/icons/CheckHeart";
import MedicalCircle from "../../assets/icons/MedicalCircle";
import CreateRequestForm from "../CreateRequestForm/CreateRequestForm";
import { getGoogleMapsUrl } from "../../utils/getMaps";
import { countDonations, initializeDonation } from "../../utils/apiUtils";

export default function RequestsCard({ message, data }) {
  const [expanded, setExpanded] = useState(false);
  const [responded, setResponded] = useState(false);
  const [donated, setDonated] = useState(false);
  const [newRequest, setNewRequest] = useState(false);
  const [respondedClicked, setRespondedClicked] = useState(false);
  const [donatedClicked, setDonatedClicked] = useState(false);
  const [responseCount, setResponseCount] = useState(null);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleResponded = async (id, buttonClicked) => {
    if (!respondedClicked) {
      try {
        const response = await initializeDonation(id);
        setDonated(false);
        setResponded(true);
        countResponded(id);
        setRespondedClicked(true);
      } catch (error) {
        console.error("Failed to initialize donor response:", error);
      }
    }
  };

  const countResponded = async (id) => {
    try {
      const response = await countDonations(id);
      setResponseCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDonated = (id) => {
    if (!donatedClicked) {
      setResponded(false);
      setDonated(true);
      setDonatedClicked(true);
    }
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
        {!newRequest &&
          data.map((request) => {
            return (
              <div className="requestsCard__row-outer" key={request.id}>
                <div
                  className="requestsCard__row-inner"
                  onClick={toggleExpanded}
                >
                  <div className="requestsCard__container">
                    <div className="requestsCard__container-details">
                      <h3>Blood Type Needed</h3>
                      <h2>{request.blood_type_needed}</h2>
                    </div>
                    <div className="requestsCard__container-details">
                      <h3>Donors Needed</h3>
                      <h2>{request.number_of_donors_needed}</h2>
                    </div>
                    <div className="requestsCard__container-details">
                      <h3>Donors Responded</h3>
                      <h2>
                        {responseCount === null
                          ? "0"
                          : responseCount.donorRespondedCount}
                      </h2>
                    </div>
                  </div>
                  {expanded && (
                    <>
                      <div className="requestsCard__container">
                        <div className="requestsCard__container-details">
                          <h3>Patient's Name</h3>
                          <h2>{request.patient_name}</h2>
                        </div>
                        <div className="requestsCard__container-details">
                          <h3>Address</h3>
                          <h2>{request.address}</h2>
                        </div>
                        <div className="requestsCard__container-details">
                          <h3>Donors Donated</h3>
                          <h2>
                            {request.donors_donated === null
                              ? "0"
                              : request.donors_donated}
                          </h2>
                        </div>
                      </div>
                      <div className="requestsCard__container-map">
                        <iframe
                          width="500"
                          height="300"
                          style={{ border: 0 }}
                          loading="lazy"
                          src={`https://www.google.com/maps/embed/v1/place?key=${
                            import.meta.env.VITE_MAPS_API
                          }
                          &q=${request.address.replace(/ /g, "+")}`}
                        ></iframe>
                      </div>
                    </>
                  )}
                  <p className="requestsCard__row-link">
                    {expanded ? "Less details" : `More details`}
                  </p>
                </div>
                <div className="requestsCard__buttons">
                  <button
                    onClick={() => toggleResponded(request.id)}
                    type="button"
                    className={
                      responded
                        ? "requestsCard__button requestsCard__button--clicked"
                        : "requestsCard__button"
                    }
                    disabled={respondedClicked}
                  >
                    <ActivityHeart stroke={responded ? "white" : "black"} />{" "}
                    I'll be there
                  </button>
                  <button
                    onClick={() => toggleDonated(request.id)}
                    type="button"
                    className={
                      donated
                        ? "requestsCard__button requestsCard__button--clicked"
                        : "requestsCard__button"
                    }
                    disabled={donatedClicked}
                  >
                    <CheckHeart stroke={donated ? "white" : "black"} /> Donated
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
}
