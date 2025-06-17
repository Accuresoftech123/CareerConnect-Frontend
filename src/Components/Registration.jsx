//import react from 'react';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "../Styles/Registerstyle.css";
import register from "../Images/register.svg";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import EmailVerificationPopup from "./EmailVerification.jsx";

const Registration = () => {
  const navigate = useNavigate();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });
 
 const handleChange = (e) => {
  e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowVerificationPopup(true);  // show popup
    try {
      // await axios.post("http://localhost:9191/jobseekers/sendOtp", null, {
      //   params: { email: formData.email }
      // });
      await axios.post("http://localhost:9191/jobseekers/register", formData);
    } catch (error) {
      alert("Error: " + (error.response?.data || error.message));
    }
  };


    

  

const handleOtpVerified = () => {
    setShowVerificationPopup(false);
    setIsVerified(true);
    alert("Email Verified Successfully!");
    navigate("/login");
  };
  const UserLogin = (e) => {
    // navigate("/login");
  };


 return (
    <div className="registerpage-container">
      <header className="register-header">
        <div className="logo">
          <span>Career</span> Connect
        </div>
        <nav className="registernav-links">
          <a href="jobs">Jobs</a>
          <a href="companies">Companies</a>
          <button className="btn-primary" onClick={() => navigate("/Login")}>Log In</button>
        </nav>
      </header>

      <main className="register-section">
        <div className="register-content">
          <div className="register-text col-6">
            <h1>Welcome Back, to <span> Career Connect</span></h1>
            <p>Your gateway to professional opportunities</p>
            <div className="illustration">
              <img src={register} alt="welcome Illustration" />
            </div>
          </div>

          {/* Registration Form */}
          <div className="register-fillUp col-6">
            <form onSubmit={handleSubmit}>
              <h3>Register</h3>
              <p>Please enter your details</p>

              <label>Full Name</label>
              <div className="registerinput-container">
                <SvgIcon component={PersonIcon} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <label>Email Id</label>
              <div className="registerinput-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  required
                />
              </div>

              <label>Mobile Number</label>
              <div className="registerinput-container">
                <SvgIcon component={PhoneIcon} />
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <label>Create Password</label>
              <div className="registerinput-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a Password"
                  required
                />
              </div>

              <label>Confirm Password</label>
              <div className="registerinput-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your Password"
                  required
                />
              </div>

              <button className="registerbtn-primary" type="submit">Register</button>
            </form>
           {showVerificationPopup && (
  <div className="popup-backdrop">
    <EmailVerificationPopup 
      email={formData.email}  
      onVerify={handleOtpVerified}  // Correct function name
    />
  </div>
)}


            {isVerified && <p style={{ color: "green" }}>Email Verified Successfully!</p>}
            <div className="optionregister">
              <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
          </div>
        </div>
      </main>
     
    </div>
  );
};

export default Registration;
