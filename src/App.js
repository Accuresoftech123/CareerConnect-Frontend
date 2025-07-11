import "./App.css";
import HomePage from "./Components/HomePage";
import Login from "./Components/JobSeeker/Login";
import Registration from "./Components/JobSeeker/Registration";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EmailVerificationPopup from "./Components/JobSeeker/EmailVerification";
import React from "react";
import EmployerLogin from "./Components/Employer/EmployerLogin";
import EmployerRegistration from "./Components/Employer/EmployerRegistration";
import EmployerCreateProfile from "./Components/Employer/EmployerCreateProfile";
import EmployerDashboard from "./Components/Employer/EmployerDashboard";
import JobSeekerSubscription from "./Components/JobSeeker/JobSeekerSubscription";
import JobSeekerCreateProfile from "./Components/JobSeeker/JobSeekerCreateProfile";
// import JobSeekerDashboard from "./Components/JobSeeker/JobSeekerDashboard";
import JobSeekerHome from "./Components/JobSeeker/JobSeekerHome";
import Dashboard from "./Components/JobSeeker/DashComponents/Dashboard";
import JSJobDetails from "./Components/JobSeeker/DashComponents/JSJobDetails";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/AdminHome";

// ✅ Import Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    // ✅ Wrap everything inside GoogleOAuthProvider
    <GoogleOAuthProvider clientId="882498608985-spao219g75dhp9r3ghtkm1ajn9p9bk3g.apps.googleusercontent.com">
      
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/*Job seeker */}
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Registration" element={<Registration />}></Route>
        <Route path="/EmailVerification" element={<EmailVerificationPopup />}></Route>
        <Route path="/JobSeeker-Subscription" element={<JobSeekerSubscription />}></Route>
        <Route path="/JobSeeker-Create-Profile" element={<JobSeekerCreateProfile />}></Route>
        {/* <Route path="/JobSeekerDashboard" element={<JobSeekerDashboard />}></Route> */}
        <Route path="/JobSeekerHome/*" element={<JobSeekerRoutes />}></Route>
        {/* <Route path="/JobSeeker/DashComponents/Dashboard" element={<Dashboard />}></Route> */}
        {/* <Route path="/JobSeeker/DashComponents/JSJobDetails" element={<JSJobDetails />}></Route> */}
 
 
 
        {/*Employer */}
        <Route path="/EmployerLogin" element={<EmployerLogin />}></Route>
        <Route path="/EmployerRegistration" element={<EmployerRegistration />}></Route>
        <Route path="/EmployerCreateProfile" element={<EmployerCreateProfile />}></Route>
        <Route path="/EmployerDashboard" element={<EmployerDashboard />}></Route>
 
        {/* Admin */}
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/AdminHome" element={<AdminHome />}></Route>
 
 
       
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

// ✅ Sub routes for JobSeeker Dashboard area
const JobSeekerRoutes = () => {
  return (
   <JobSeekerHome>
      <Routes>
        <Route path="Jobseeker-Dashboard" element={<Dashboard/>}/>
        <Route path="Job-details" element={<JSJobDetails/>}/>
      </Routes>
    </JobSeekerHome>
  );
};

export default App;
