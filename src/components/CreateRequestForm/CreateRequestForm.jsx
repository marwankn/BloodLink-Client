import React, { useState } from "react";
import "./CreateRequestForm.scss";
import Autocomplete from "react-google-autocomplete";
import { Navigate, useNavigate } from "react-router-dom";

function YourFormComponent({ toggleNewRequest }) {
  const mapsApi = import.meta.env.VITE_MAPS_API;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    numDonors: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.patientName.trim())) {
      newErrors.patientName = "Only letters and spaces are allowed";
    }

    if (formData.bloodType.trim() === "") {
      newErrors.bloodType = "Blood Type is required";
    }

    const numDonors = parseInt(formData.numDonors);
    if (isNaN(numDonors) || numDonors < 0 || numDonors > 10) {
      newErrors.numDonors = "Please enter a number between 0 and 10";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/dashboard");
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
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="createRequests__input"
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="error-message">{errors.patientName}</p>
            )}
          </div>

          <div className="createRequests__container-details">
            <label htmlFor="bloodType">Blood Type Needed:</label>
            <input
              type="text"
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="createRequests__input"
              placeholder="e.g., AB+"
            />
            {errors.bloodType && (
              <p className="error-message">{errors.bloodType}</p>
            )}
          </div>

          <div className="createRequests__container-details">
            <label htmlFor="numDonors">Number of Donors Needed:</label>
            <input
              type="number"
              id="numDonors"
              name="numDonors"
              value={formData.numDonors}
              onChange={handleChange}
              className="createRequests__input"
              placeholder="Enter the number of donors needed"
            />
            {errors.numDonors && (
              <p className="error-message">{errors.numDonors}</p>
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
