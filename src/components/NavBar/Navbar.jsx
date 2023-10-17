import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/icons/homeSmile";
import UserIcon from "../../assets/icons/user";
import HeartHand from "../../assets/icons/heartHand";
import "./NavBar.scss";

export default function NavBar() {
  const location = useLocation();
  const dashboardPath = location.pathname.includes("dashboard");
  const requestsPath = location.pathname.includes("requests");
  const profilePath = location.pathname.includes("profile");

  return (
    <>
      <nav className="navbar">
        <NavLink
          className={`navbar__link ${
            dashboardPath ? "navbar__link--active" : ""
          }`}
          to="/dashboard"
        >
          <div className="navbar__link-container">
            <HomeIcon stroke={dashboardPath ? "black" : "#6e7e85"} />
          </div>
          <p className="navbar__link-text ">Home</p>
        </NavLink>
        <NavLink
          className={`navbar__link ${
            requestsPath ? "navbar__link--active" : ""
          }`}
          to="/requests"
        >
          <div className="navbar__link-container">
            <HeartHand stroke={requestsPath ? "black" : "#6e7e85"} />
          </div>
          <p className="navbar__link-text">Requests</p>
        </NavLink>
        <NavLink
          className={`navbar__link ${
            profilePath ? "navbar__link--active" : ""
          }`}
          to="/profile"
        >
          <div className="navbar__link-container">
            <UserIcon stroke={profilePath ? "black" : "#6e7e85"} />
          </div>
          <p className="navbar__link-text">Profile</p>
        </NavLink>
      </nav>
    </>
  );
}
