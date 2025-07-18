import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//main homepage
import HomePage from "./Components/HomePage";

//Job seeker
import Login from "./Components/JobSeeker/Login";
import Registration from "./Components/JobSeeker/Registration";
import EmailVerificationPopup from "./Components/JobSeeker/EmailVerification";
import JobSeekerSubscription from "./Components/JobSeeker/JobSeekerSubscription";
import JobSeekerCreateProfile from "./Components/JobSeeker/JobSeekerCreateProfile";
import JobSeekerHome from "./Components/JobSeeker/JobSeekerHome";
import Dashboard from "./Components/JobSeeker/DashComponents/Dashboard";
import JSJobDetails from "./Components/JobSeeker/DashComponents/JSJobDetails";
import SpecificJob from "./Components/JobSeeker/DashComponents/SpecificJob";

//employer 
import EmployerLogin from "./Components/Employer/EmployerLogin";
import EmployerRegistration from "./Components/Employer/EmployerRegistration";
import EmployerCreateProfile from "./Components/Employer/EmployerCreateProfile";
import EmployerHome from "./Components/Employer/EmployerHome";
import EmployerDashboard from "./Components/Employer/Dashcomponents/EmployerDashboard";
import JobPost from "./Components/Employer/Dashcomponents/JobPost";

//Admin
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHome from "./Components/Admin/AdminHome";
import AdminDashboard from "./Components/Admin/Dashcomponents/AdminDashboard";

// ✅ Import Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    // ✅ Wrap everything inside GoogleOAuthProvider
    <GoogleOAuthProvider clientId="882498608985-spao219g75dhp9r3ghtkm1ajn9p9bk3g.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Job seeker */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/EmailVerification" element={<EmailVerificationPopup />} />
          <Route path="/JobSeeker-Subscription" element={<JobSeekerSubscription />} />
          <Route path="/JobSeeker-Create-Profile" element={<JobSeekerCreateProfile />} />
          <Route path="/JobSeekerHome/*" element={<JobSeekerRoutes />} />

        {/*Employer */}
        <Route path="/EmployerLogin" element={<EmployerLogin />}></Route>
        <Route path="/EmployerRegistration" element={<EmployerRegistration />}></Route>
        <Route path="/EmployerCreateProfile" element={<EmployerCreateProfile />}></Route>
        <Route path="/EmployerHome/*" element={<EmployerRoutes />}></Route>
 
        {/* Admin */}
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/AdminHome/*" element={<AdminRoutes />}></Route>
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
   <EmployerHome>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="Admin-Dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </EmployerHome>
  );
};
export default App;
