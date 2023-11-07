import React, { useEffect, useState } from "react";
import CheckHeart from "../../assets/icons/CheckHeart";
import ActivityHeart from "../../assets/icons/activityHeart";
import { getCount, userDonated, userResponded } from "../../utils/apiUtils";

const RequestsDetails = ({ request }) => {
  const [responded, setResponded] = useState(false);
  const [donated, setDonated] = useState(false);
  const [respondedClicked, setRespondedClicked] = useState(false);
  const [donatedClicked, setDonatedClicked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseCount, setResponseCount] = useState({
    donorRespondedCount: 0,
    donorDonatedCount: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getCount(request.id);
      if (response.status === 200) {
        const data = response.data;
        setResponseCount({
          donorRespondedCount: data.donor_responded,
          donorDonatedCount: data.donor_donated,
        });
        setResponded(data.responded);
        setDonated(data.donated);
      }
    } catch (error) {
      console.error("Failed to fetch request data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [responded, donated]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleResponded = async () => {
    if (!respondedClicked) {
      try {
        const response = await userResponded(request.id);
        setDonated(false);
        setResponded(true);
        setRespondedClicked(true);
      } catch (error) {
        console.error("Failed to initialize donor response:", error);
      }
    }
  };

  const toggleDonated = async () => {
    if (!donatedClicked) {
      try {
        const response = await userDonated(request.id);
        setResponded(false);
        setDonated(true);
        setDonatedClicked(true);
      } catch (error) {
        console.error("Failed to confirm donation:", error);
      }
    }
  };
  return (
    <div className="requestsCard__row-outer" key={request.id}>
      <div className="requestsCard__row-inner" onClick={toggleExpanded}>
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
              {loading ? "Loading..." : responseCount.donorRespondedCount}
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
                  {loading ? "Loading..." : responseCount.donorDonatedCount}
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
          onClick={toggleResponded}
          type="button"
          className={
            responded
              ? "requestsCard__button requestsCard__button--clicked"
              : "requestsCard__button"
          }
          disabled={responded}
        >
          <ActivityHeart stroke={responded ? "white" : "black"} /> I'll be there
        </button>
        <button
          onClick={toggleDonated}
          type="button"
          className={
            donated
              ? "requestsCard__button requestsCard__button--clicked"
              : "requestsCard__button"
          }
          disabled={donated}
        >
          <CheckHeart stroke={donated ? "white" : "black"} /> Donated
        </button>
      </div>
    </div>
  );
};

export default RequestsDetails;
