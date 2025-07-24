import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//main homepage
import HomePage from "./Components/HomePage";
import Candidates from "./Components/Candidates";
import Companies from "./Components/Companies";
import Jobs from "./Components/Jobs";
//Job seeker
import Login from "./Components/JobSeeker/Login";
import Registration from "./Components/JobSeeker/Registration";
import JEmailVerificationPopup from "./Components/JobSeeker/EmailVerification";
import JobSeekerSubscription from "./Components/JobSeeker/JobSeekerSubscription";
import JobSeekerCreateProfile from "./Components/JobSeeker/JobSeekerCreateProfile";
import JobSeekerHome from "./Components/JobSeeker/JobSeekerHome";
import Dashboard from "./Components/JobSeeker/DashComponents/Dashboard";
import JSJobDetails from "./Components/JobSeeker/DashComponents/JSJobDetails";
import SpecificJob from "./Components/JobSeeker/DashComponents/SpecificJob";
import ForgotPassword from "./Components/JobSeeker/ForgotPassword";
import ResetPassword from "./Components/JobSeeker/ResetPassword";


//employer 
import EmployerLogin from "./Components/Employer/EmployerLogin";
import EmployerRegistration from "./Components/Employer/EmployerRegistration";
import EEmailVerificationPopup from "./Components/Employer/EmailVerification";
import EmployerCreateProfile from "./Components/Employer/EmployerCreateProfile";
import EmployerHome from "./Components/Employer/EmployerHome";
import EmployerDashboard from "./Components/Employer/Dashcomponents/EmployerDashboard";
import JobPost from "./Components/Employer/Dashcomponents/JobPost";
import EmployerForgotPassword from "./Components/Employer/EmployerForgotPassword";
import EmployerResetPassword from "./Components/Employer/EmployerResetPassword";

//Admin
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/AdminHome";
import AdminDashboard from "./Components/Admin/Dashcomponents/AdminDashboard";
import AdminForgotPassword from "./Components/Admin/AdminForgotPassword";
import AdminResetPassword from "./Components/Admin/AdminResetPassword";

// ✅ Import Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    // ✅ Wrap everything inside GoogleOAuthProvider
    <GoogleOAuthProvider clientId="882498608985-spao219g75dhp9r3ghtkm1ajn9p9bk3g.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/Companies" element={<Companies />} />
          <Route path="/Candidates" element={<Candidates />} />
          {/* Job seeker */}
          <Route path="/Jobseeker" element={<Login />} />
          <Route path="/Forgot-Password" element={<ForgotPassword />} />
          <Route path="/Reset-Password" element={<ResetPassword />} />
          <Route path="/Jobseeker-Registration" element={<Registration />} />
          <Route path="/EmailVerification" element={<JEmailVerificationPopup />} />
          <Route path="/JobSeeker-Subscription" element={<JobSeekerSubscription />} />
          <Route path="/JobSeeker-Create-Profile" element={<JobSeekerCreateProfile />} />
          <Route path="/JobSeekerHome/*" element={<JobSeekerRoutes />} />

        {/*Employer */}
        <Route path="/Employer" element={<EmployerLogin />}></Route>
        <Route path="/Employer-Registration" element={<EmployerRegistration />}/>
          <Route path="/EmailVerification" element={<EEmailVerificationPopup />} />
        <Route path="/Employer-Create-Profile" element={<EmployerCreateProfile />}/>
        <Route path="/EmployerHome/*" element={<EmployerRoutes />}/>
        <Route path="/Employer-ForgotPassword" element={<EmployerForgotPassword />} />
        <Route path="/Employer-ResetPassword" element={<EmployerResetPassword />} />



 
        {/* Admin */}
        <Route path="/Admin" element={<AdminLogin />}/>
        <Route path="/AdminHome/*" element={<AdminRoutes />}/>
        <Route path="/Admin-ForgotPassword" element={<AdminForgotPassword />} />
        <Route path="/Admin-ResetPassword" element={<AdminResetPassword />} />

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
        <Route index element={<Dashboard />} />
        <Route path="Jobseeker-Dashboard" element={<Dashboard/>}/>
        <Route path="Job-details" element={<JSJobDetails/>}/>
        <Route path="SpecificJob" element={<SpecificJob/>}/>
      </Routes>
    </JobSeekerHome>
  );
};

const EmployerRoutes = () => {
  return (
   <EmployerHome>
      <Routes>
        <Route index element={<EmployerDashboard />} />
        <Route path="Employer-Dashboard" element={<EmployerDashboard/>}/>
        <Route path="Job-Post" element={<JobPost/>}/>
      </Routes>
    </EmployerHome>
  );
};
const AdminRoutes = () => {
  return (
   <AdminHome>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="Admin-Dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </AdminHome>
  );
};
export default App;
