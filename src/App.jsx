import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/NavBar/Navbar";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import RequestsPage from "./pages/RequestsPage/RequestsPage";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
