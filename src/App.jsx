// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import "./App.scss";
// import NavBar from "./components/NavBar/Navbar";
// import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
// import RequestsPage from "./pages/RequestsPage/RequestsPage";
// import ProfilePage from "./pages/ProfilePage/ProfilePage";
// // import SignUpPage from "./components/SignUpPage/SignUpPage";
// // import LoginPage from "./pages/LogInPage/LoginPage";
// import { useState } from "react";
// import Login from "./components/LogInPage/Login";
// function App() {
//   const [token, setToken] = useState();
//   const currentPath = window.location.pathname;
//   const pathsToHideNavBar = ["/login", "/signup"];
//   const hideNavBar = pathsToHideNavBar.includes(currentPath);

//   if (!token) {
//     return <Login setToken={setToken} />;
//   }

//   return (
//     <BrowserRouter>
//       {hideNavBar ? null : <NavBar />}

//       <Routes>
//         <Route path="/" element={<Navigate to={"/dashboard"} />} />
//         {/* <Route path="/signup" element={<SignUpPage />} /> */}
//         {/* <Route path="/login" element={<LoginPage />} /> */}
//         <Route path="/dashboard" element={<DashboardPage />} />
//         <Route path="/requests" element={<RequestsPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/NavBar/Navbar";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import RequestsPage from "./pages/RequestsPage/RequestsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useState } from "react";
import LoginPage from "./pages/LogInPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "d");

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
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignUpPage setToken={setToken} />} />

        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/requests"
          element={token ? <RequestsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
