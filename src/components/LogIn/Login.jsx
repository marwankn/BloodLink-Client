import React, { useState } from "react";
import "./Login.scss";
import { loginUser } from "../../utils/apiUtils";
import logo from "../../assets/group.png";
import { Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(userData);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    } catch (error) {
      alert("Login Failed! Please try again...");
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="logo" className="login__logo" />
      <h1 className="login__title">Welcome Back!</h1>
      <form onSubmit={handleLogin} className="login__form">
        <div className="login__container">
          <label className="login__label">Email</label>
          <input
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
          />
        </div>
        <div className="login__container">
          <label className="login__label">Password</label>
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
          />
        </div>
        <div className="login__button-container">
          <Link className="login__button-signup" to="/signup">
            Sign Up
          </Link>
          <button type="submit" className="login__button-submit">
            &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
