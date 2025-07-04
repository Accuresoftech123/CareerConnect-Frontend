import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

import "../../Styles/JobSeeker/Registerstyle.css";
import register from "../../Images/register.svg";

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

  const url = "http://localhost:9191";

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
    setShowVerificationPopup(true);

    try {
    const response = await axios.post(`${url}/jobseekers/register`, formData);



    if (response.status === 201) {
      const { message, jobSeekerId } = response.data;

      // Store the JobSeeker ID for later use (e.g. in profile update)
      localStorage.setItem("jobSeekerId", jobSeekerId);

      alert(message); // e.g., "OTP sent. Please verify your email."

      // Now show the OTP popup
      setShowVerificationPopup(true);
    } else {
      alert("Unexpected response from server.");
    }
  } catch (error) {
    alert("Error: " + (error.response?.data || error.message));
    setShowVerificationPopup(false);
  }
};

  const handleOtpVerified = () => {
    setShowVerificationPopup(false);
    setIsVerified(true);
    alert("Email Verified Successfully!");
    // navigate("/Login");
  };

  return (
    <div className="jobseeker_register-container">
      {/* Header */}
      <header className="jobseeker_register-header">
        <div className="jobseeker_register-logo">
          <span>Career</span> Connect
        </div>
        <nav className="jobseeker_register-nav">
            <Link to="/" >
            Home
          </Link>
          <Link to="/jobs" >
            Jobs
          </Link>
          <Link to="/companies" >
            Companies
          </Link>
          <Link to="/Login">
          <button className="jobseeker_register-btn-primary">Log In</button>
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="jobseeker_register-section">
        <div className="jobseeker_register-content">
          {/* Left side: welcome and illustration */}
          <div className="jobseeker_register-text">
            <h1>
              Welcome Back, to <br></br><span>Career Connect</span>
            </h1>
            <p>Your gateway to professional opportunities</p>
            <div className="jobseeker_register-illustration">
              <img src={register} alt="Welcome" />
            </div>
          </div>

          {/* Right side: Registration form */}
          <div className="jobseeker_register-form">
            <form onSubmit={handleSubmit}>
              <h3>Register</h3>
              <p>Please enter your details</p>

              <label>Full Name</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={PersonIcon} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Email Id</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Mobile Number</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={PhoneIcon} />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Create Password</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Confirm Password</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="jobseeker_register-btn-submit" type="submit">
                Register
              </button>
            </form>

            {showVerificationPopup && (
              <div className="popup-backdrop">
                <EmailVerificationPopup
                  email={formData.email}
                  onVerify={handleOtpVerified}
                />
              </div>
            )}

            {isVerified && (
              <p style={{ color: "green" }}>Email Verified Successfully!</p>
            )}

            <div className="jobseeker_register-option">
              <p>
                Already have an account? <a href="/Login">Log In</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
