import React, { useState } from "react";
import "./SignUp.scss";
import Autocomplete from "react-google-autocomplete";
import { formatToYYYYMMDD } from "../../utils/DateFormatter";
import { addProfile, signupUser } from "../../utils/apiUtils";
import { isValidDate } from "../../utils/isValidDate";
import logo from "../../assets/group.png";
import { Link } from "react-router-dom";

const SignUp = ({ setToken }) => {
  const mapsApi = import.meta.env.VITE_MAPS_API;
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [waitToken, setWaitToken] = useState();
  const [firstStepData, setFirstStepData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [secondStepData, setSecondStepData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    blood_type: "",
    sex: "",
    last_donation: "",
    travel_radius_for_donation: "",
  });

  const handleFirstChange = (e) => {
    const { name, value } = e.target;

    setFirstStepData({
      ...firstStepData,
      [name]: value,
    });
  };

  const handleSecondChange = (e) => {
    const { name, value } = e.target;

    if (name === "last_donation") {
      const formattedValue = formatToYYYYMMDD(value);
      setSecondStepData({
        ...secondStepData,
        [name]: formattedValue,
      });
    } else {
      setSecondStepData({
        ...secondStepData,
        [name]: value,
      });
    }
  };

  const handleNumericInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const numericValue = value.replace(/[^0-9]/g, "");

    setSecondStepData({
      ...secondStepData,
      [name]: Number(numericValue),
    });
  };

  const handleStep1 = async () => {
    const step1Errors = {};
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        firstStepData.email
      )
    ) {
      step1Errors.email = "Check email format!";
    }
    if (!firstStepData.password) {
      step1Errors.password = "Password is required";
    }
    if (firstStepData.password !== firstStepData.confirmPassword) {
      step1Errors.passwordConfirm = "Passwords do not match";
    }

    if (Object.keys(step1Errors).length === 0) {
      delete firstStepData.confirmPassword;

      try {
        const response = await signupUser(firstStepData);
        localStorage.setItem("token", response.data.token);

        setStep(2);
      } catch (error) {
        alert(`${error.response.data.error}, Please Try Logging In!`);
      }
    } else {
      setErrors(step1Errors);
    }
  };

  const handleStep2 = async (e) => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(secondStepData.first_name)) {
      newErrors.first_name = "Only letters and spaces are allowed";
    }

    if (!/^[a-zA-Z\s]+$/.test(secondStepData.last_name)) {
      newErrors.last_name = "Only letters and spaces are allowed";
    }

    if (!/^[0-9]{10}$/.test(secondStepData.phone_number)) {
      newErrors.phone_number = "Phone number should contain only 10 numbers";
    }

    if (secondStepData.address.trim() === "") {
      newErrors.address = "Address is required";
    }

    if (!/^[A-Za-z+/-]{1,3}$/.test(secondStepData.blood_type)) {
      newErrors.blood_type = "Insert Valid Blood Type (e.g., A+)";
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(secondStepData.last_donation) ||
      !isValidDate(secondStepData.last_donation)
    ) {
      newErrors.last_donation = "Invalid date format (yyyy-mm-dd)";
    }

    if (
      isNaN(secondStepData.travel_radius_for_donation) ||
      secondStepData.travel_radius_for_donation < 0
    ) {
      newErrors.travel_radius_for_donation =
        "Travel radius must be a positive number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await addProfile(secondStepData);
        setToken(localStorage.getItem("token"));
      } catch (error) {
        console.log(`${error.response.data.error}! Please try again`);
      }
    }
  };

  return (
    <div className="signup">
      <img src={logo} alt="logo" className="signup__logo" />
      <h1 className="signup__title">Sign Up</h1>
      {step === 1 ? (
        <div className="signup__step">
          <h2 className="signup__form-title">Step 1: Account Information</h2>
          <div className="signup__form-field">
            <label className="signup__form-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleFirstChange}
              value={firstStepData.email}
              className="signup__form-input"
            />
            {errors.email && (
              <span className="signup__error">{errors.email}</span>
            )}
          </div>
          <div className="signup__form-field">
            <label className="signup__form-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleFirstChange}
              value={firstStepData.password}
              className="signup__form-input"
            />
            {errors.password && (
              <span className="signup__error">{errors.password}</span>
            )}
          </div>
          <div className="signup__form-field">
            <label className="signup__form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleFirstChange}
              value={firstStepData.confirmPassword}
              className="signup__form-input"
            />
            {errors.passwordConfirm && (
              <span className="signup__error">{errors.passwordConfirm}</span>
            )}
          </div>
          <div className="signup__buttons">
            <Link className="signup__button-back" to="/login">
              Log In
            </Link>
            <button onClick={handleStep1} className="signup__button">
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="signup__step">
          <h2 className="signup__form-title">Step 2: Personal Information</h2>
          <div className="signup__form-field">
            <label htmlFor="first_name" className="signup__form-label">
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={secondStepData.first_name}
              onChange={handleSecondChange}
              className="signup__form-input"
            />
            {errors.first_name && (
              <p className="signup__error">{errors.first_name}</p>
            )}
          </div>

          <div className="signup__form-field">
            <label htmlFor="last_name" className="signup__form-label">
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={secondStepData.last_name}
              onChange={handleSecondChange}
              className="signup__form-input"
            />
            {errors.last_name && (
              <p className="signup__error">{errors.last_name}</p>
            )}
          </div>

          <div className="signup__form-field">
            <label htmlFor="phone_number" className="signup__form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone_number"
              pattern="[0-9]*"
              name="phone_number"
              onInput={handleNumericInput}
              value={secondStepData.phone_number}
              // onChange={handleSecondChange}
              className="signup__form-input"
            />
            {errors.phone_number && (
              <p className="signup__error">{errors.phone_number}</p>
            )}
          </div>

          <div className="signup__form-field">
            <label htmlFor="address" className="signup__form-label">
              Address:
            </label>
            <Autocomplete
              apiKey={mapsApi}
              className="signup__form-input"
              value={secondStepData.address}
              onChange={(e) => {
                setSecondStepData({
                  ...secondStepData,
                  address: e.target.value,
                });
              }}
              options={{
                types: ["geocode"],
                componentRestrictions: { country: "CA" },
              }}
              onPlaceSelected={(place) => {
                if (place && place.formatted_address) {
                  setSecondStepData((secondStepData) => {
                    return {
                      ...secondStepData,
                      address: place.formatted_address,
                    };
                  });
                }
              }}
            />
            {errors.address && (
              <p className="signup__error">{errors.address}</p>
            )}
          </div>

          <div className="signup__form-field">
            <label htmlFor="blood_type" className="signup__form-label">
              Blood Type:
            </label>
            <select
              value={secondStepData.blood_type}
              onChange={handleSecondChange}
              name="blood_type"
              className="signup__form-input"
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
              <p className="signup__error">{errors.blood_type}</p>
            )}
          </div>
          <div className="signup__form-field">
            <label className="signup__form-label">Sex</label>
            <select
              value={secondStepData.sex}
              className="signup__form-input"
              onChange={handleSecondChange}
              name="sex"
            >
              <option value="">Select Sex</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
            {errors.sex && <span className="signup__error">{errors.sex}</span>}
          </div>
          <div className="signup__form-field">
            <label
              htmlFor="travel_radius_for_donation"
              className="signup__form-label"
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
              value={secondStepData.travel_radius_for_donation}
              onInput={handleNumericInput}
              className="signup__form-input"
            />
            <span className="profile-form__input-slider">
              {secondStepData.travel_radius_for_donation || "Adjust"} km
            </span>
            {errors.travel_radius_for_donation && (
              <p className="signup__error">
                {errors.travel_radius_for_donation}
              </p>
            )}
          </div>

          <div className="signup__form-field">
            <label htmlFor="last_donation" className="signup__form-label">
              Last Donation (yyyy-mm-dd):
            </label>
            <input
              type="text"
              id="last_donation"
              value={secondStepData.last_donation}
              name="last_donation"
              onChange={handleSecondChange}
              className="signup__form-input"
            />
            {errors.last_donation && (
              <p className="signup__error">{errors.last_donation}</p>
            )}
          </div>
          <div className="signup__buttons-second">
            <button
              type="submit"
              onClick={handleStep2}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="signup__button"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
