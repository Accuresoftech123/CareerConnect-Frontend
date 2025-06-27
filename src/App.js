import "./App.css";
import HomePage from "./Components/HomePage";
import Login from "./Components/JobSeeker/Login";
import Registration from "./Components/JobSeeker/Registration";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EmailVerificationPopup from "./Components/JobSeeker/EmailVerification";
import React from "react";
import axios from "axios";
import EmployerLogin from "./Components/Employer/EmployerLogin";
import EmployerRegistration from "./Components/Employer/EmployerRegistration";
import EmployerCreateProfile from "./Components/Employer/EmployerCreateProfile";
import EmployerDashboard from"./Components/Employer/EmployerDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/EmployerLogin" element={<EmployerLogin />}></Route>
        <Route path="/EmployerRegistration" element={<EmployerRegistration />}></Route>
        <Route path="/EmployerCreateProfile" element={<EmployerCreateProfile />}></Route>
        <Route path="/EmailVerification" element={<EmailVerificationPopup />}></Route>
        <Route path="/EmployerDashboard" element={<EmployerDashboard />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
