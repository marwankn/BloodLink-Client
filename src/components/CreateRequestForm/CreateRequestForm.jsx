import React, { useState } from "react";
import "./CreateRequestForm.scss";
import Autocomplete from "react-google-autocomplete";
import { Navigate, useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/apiUtils";

function YourFormComponent({ toggleNewRequest }) {
  const mapsApi = import.meta.env.VITE_MAPS_API;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_name: "",
    blood_type_needed: "",
    number_of_donors_needed: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.patientName.trim())) {
      newErrors.patientName = "Only letters and spaces are allowed";
    }

    if (formData.blood_type.trim() === "") {
      newErrors.blood_type = "Blood Type is required";
    }

    const numDonors = parseInt(formData.numDonors);
    if (isNaN(numDonors) || numDonors < 0 || numDonors > 10) {
      newErrors.numDonors = "Please enter a number between 0 and 10";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await postRequest(formData);
        if (response.status === 201) {
          // Request was successful, navigate to the dashboard
          navigate("/dashboard");
        } else {
          // Handle other response statuses if needed
          console.log("Request was not successful:", response);
        }
      } catch (error) {
        // Handle any network or server errors
        console.error("Error when posting the request:", error);
      }
    }
  };

  const handleAddressSelected = (place) => {
    if (place) {
      const address = place.formatted_address;
      setFormData((prevData) => ({
        ...prevData,
        address,
      }));
    }
  };

  const handleFormKeyPress = (e) => {
    if (e.key === "Enter" && e.target.type !== "textarea") {
      e.preventDefault();
    }
  };

  return (
    <div className="createRequests">
      <form onSubmit={handleSubmit} onKeyPress={handleFormKeyPress}>
        <div className="createRequests__container">
          <div className="createRequests__container-details">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="createRequests__input"
              placeholder="Enter patient name"
            />
            {errors.patient_name && (
              <p className="error-message">{errors.patient_name}</p>
            )}
          </div>

          <div className="createRequests__container-details">
            <label htmlFor="blood_type">Blood Type Needed:</label>
            <select
              value={formData.blood_type_needed}
              onChange={handleChange}
              id="blood_type"
              name="blood_type_needed"
              className="createRequests__input"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {errors.blood_type_needed && (
              <p className="error-message">{errors.blood_type_needed}</p>
            )}
          </div>

          <div className="createRequests__container-details">
            <label htmlFor="numDonors">Number of Donors Needed:</label>
            <input
              type="number"
              id="numDonors"
              name="number_of_donors_needed"
              value={formData.number_of_donors_needed}
              onChange={handleChange}
              className="createRequests__input"
              placeholder="Enter the number of donors needed"
            />
            {errors.number_of_donors_needed && (
              <p className="error-message">{errors.number_of_donors_needed}</p>
            )}
          </div>

          <div className="createRequests__container-details">
            <label htmlFor="address">Address:</label>
            <Autocomplete
              apiKey={mapsApi}
              className="createRequests__input"
              onPlaceSelected={handleAddressSelected}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: { country: "CA" },
              }}
            />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="createRequests__buttons">
          <button
            type="button"
            onClick={toggleNewRequest}
            className="createRequests__button"
          >
            Cancel
          </button>
          <button type="submit" className="createRequests__button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default YourFormComponent;
