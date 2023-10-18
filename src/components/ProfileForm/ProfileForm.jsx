import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { formatToYYYYMMDD } from "../../utils/DateFormatter";
import "./ProfileForm.scss";
import { isValidDate } from "../../utils/isValidDate";

function ProfileForm() {
  const mapsApi = import.meta.env.VITE_MAPS_API;
  const data = {
    id: 2,
    first_name: "Laila",
    last_name: "Omar",
    phone_number: 1234567890,
    address: "100 Forest Ave Hamilton, ON L8N3X2",
    blood_type: "A+",
    last_donation: "2023-04-01",
    travel_radius_for_donation: 1000,
  };
  const [formData, setFormData] = useState(data);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // fetch("/api/userProfile")
    // .then((response) => response.json())
    // .then((data) => {
    setFormData(data); // Assuming the API response matches the form data structure
    // })
    // .catch((error) => console.error("Error fetching user profile data: ", error));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.first_name)) {
      newErrors.first_name = "Only letters and spaces are allowed";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.last_name)) {
      newErrors.last_name = "Only letters and spaces are allowed";
    }

    if (!/^\d+$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number should contain only numbers";
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
      // Axios Call HERE
      console.log("Form submitted:", formData);
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
          <input
            type="text"
            id="blood_type"
            name="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
            className="profile-form__input"
          />
          {errors.blood_type && (
            <p className="profile-form__error">{errors.blood_type}</p>
          )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="last_donation" className="profile-form__label">
            Last Donation (yyyy-mm-dd):
          </label>
          <input
            type="text"
            id="last_donation"
            name="last_donation"
            value={formData.last_donation}
            onChange={handleChange}
            className="profile-form__input"
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
            type="text"
            id="travel_radius_for_donation"
            name="travel_radius_for_donation"
            value={formData.travel_radius_for_donation}
            onChange={handleChange}
            className="profile-form__input"
          />
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
