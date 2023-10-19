import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/NavBar/Navbar";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import RequestsPage from "./pages/RequestsPage/RequestsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LogInPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { getProfile } from "./utils/apiUtils";
import { eligibilityCalc } from "./utils/eligibilityCalc";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userProfile, setUserProfile] = useState(null);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    if (token) {
      getProfile()
        .then((profileData) => {
          const data = profileData.data;
          const daysLeft = eligibilityCalc(data.last_donation, data.sex);
          data.daysLeft = daysLeft;
          setUserProfile(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [token, update]);

  if (token && !userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {token && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to={"/dashboard"} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            token && userProfile ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setToken={setToken} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignUpPage setToken={setToken} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            userProfile ? (
              <DashboardPage userProfile={userProfile} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/requests"
          element={token ? <RequestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            token ? (
              <ProfilePage
                userProfile={userProfile}
                setUpdate={setUpdate}
                update={update}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
