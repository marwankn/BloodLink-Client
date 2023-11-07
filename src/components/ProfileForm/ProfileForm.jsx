import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { formatToYYYYMMDD } from "../../utils/DateFormatter";
import "./ProfileForm.scss";
import { isValidDate } from "../../utils/isValidDate";
import { editProfile } from "../../utils/apiUtils";
import { Navigate, useNavigate } from "react-router-dom";
import todayDate from "../../utils/todayDate";

function ProfileForm({ userProfile, setUpdate, update }) {
  const mapsApi = import.meta.env.VITE_MAPS_API;
  const [formData, setFormData] = useState(userProfile);
  console.log(formData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "last_donation") {
      const formattedValue = formatToYYYYMMDD(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.first_name)) {
      newErrors.first_name = "Only letters and spaces are allowed";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.last_name)) {
      newErrors.last_name = "Only letters and spaces are allowed";
    }

    if (!/^[0-9]{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number should contain only 10 numbers";
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    }

    if (!/^[A-Za-z+/-]{1,3}$/.test(formData.blood_type)) {
      newErrors.blood_type = "Insert Valid Blood Type (e.g., A+)";
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.last_donation) ||
      !isValidDate(formData.last_donation)
    ) {
      newErrors.last_donation = "Invalid date format (yyyy-mm-dd)";
    }

    if (
      isNaN(formData.travel_radius_for_donation) ||
      formData.travel_radius_for_donation < 0
    ) {
      newErrors.travel_radius_for_donation =
        "Travel radius must be a positive number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        delete formData.daysLeft;
        delete formData.created_at;
        delete formData.updated_at;
        const response = await editProfile(formData);
        setUpdate(!update);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="profile-form">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="profile-form__field">
          <label htmlFor="first_name" className="profile-form__label">
            First Name:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="profile-form__input"
          />
          {errors.first_name && (
            <p className="profile-form__error">{errors.first_name}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="last_name" className="profile-form__label">
            Last Name:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="profile-form__input"
          />
          {errors.last_name && (
            <p className="profile-form__error">{errors.last_name}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="phone_number" className="profile-form__label">
            Phone Number:
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="profile-form__input"
          />
          {errors.phone_number && (
            <p className="profile-form__error">{errors.phone_number}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="address" className="profile-form__label">
            Address:
          </label>
          <Autocomplete
            apiKey={mapsApi}
            className="profile-form__input"
            value={formData.address}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: e.target.value,
              });
            }}
            options={{
              types: ["geocode"],
              componentRestrictions: { country: "CA" },
            }}
            onPlaceSelected={(place) => {
              if (place && place.formatted_address) {
                setFormData({
                  ...formData,
                  address: place.formatted_address,
                });
              }
            }}
          />
          {errors.address && (
            <p className="profile-form__error">{errors.address}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="blood_type" className="profile-form__label">
            Blood Type:
          </label>
          <select
            value={formData.blood_type}
            onChange={handleChange}
            name="blood_type"
            className="profile-form__input-dropdown"
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
          {errors.blood_type && (
            <p className="profile-form__error">{errors.blood_type}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="last_donation" className="profile-form__label">
            Last Donation (yyyy-mm-dd):
          </label>
          <input
            type="date"
            id="last_donation"
            name="last_donation"
            value={formData.last_donation}
            onChange={handleChange}
            className="profile-form__input-date"
            max={todayDate()}
          />
          {errors.last_donation && (
            <p className="profile-form__error">{errors.last_donation}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label
            htmlFor="travel_radius_for_donation"
            className="profile-form__label"
          >
            Travel Radius for Donation:
          </label>
          <input
            type="range"
            id="travel_radius_for_donation"
            name="travel_radius_for_donation"
            min="2"
            max="100"
            step="2"
            value={formData.travel_radius_for_donation}
            onChange={handleChange}
            className="profile-form__input"
          />
          <span className="profile-form__input-slider">
            {formData.travel_radius_for_donation} km
          </span>
          {errors.travel_radius_for_donation && (
            <p className="profile-form__error">
              {errors.travel_radius_for_donation}
            </p>
          )}
        </div>
        <div className="profile-form__submit">
          <button type="submit" className="profile-form__submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
