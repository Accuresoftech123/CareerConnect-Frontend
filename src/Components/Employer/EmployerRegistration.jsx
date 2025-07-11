import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/Employer/EmployerRegisterstyle.css";
import EmployerRegistrationImage from "../../Images/EmployerRegisterImage.svg";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import EmailVerificationPopup from "./EmailVerification.jsx";

const Registration = () => {
   const url = "http://localhost:9191";
  const navigate = useNavigate();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
 
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!agreed) {
    alert("You must agree to the Terms and Conditions.");
    return;
  }
   if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

  try {
    const response = await axios.post(`${url}/recruiters/register`, formData);

    const recruiterId = response.data.recruiterId;
    localStorage.setItem("recruiterId", recruiterId);
    console.log("Recruiter ID:", recruiterId);

    setShowVerificationPopup(true);
    alert("📨 OTP sent to your email. Please verify your email.");
  } catch (error) {
    const message =
      error.response?.data?.message || JSON.stringify(error.response?.data || error.message);

     if (message.includes("already registered")) {
        alert("⚠️ This email is already registered. Please log in instead.");
        navigate("/EmployerLogin");
     }else {
      alert("❌ Error: " + message);
    }
  }
};

 
  const handleOtpVerified = () => {
    setShowVerificationPopup(false);
    setIsVerified(true);
    alert("Email Verified Successfully!");
    navigate("/EmployerCreateProfile");
  };
 
  return (
    <div className="employer_register-container">
      {/* Header */}
      <header className="employer_register-header">
        <div className="employer_register-logo">
          <span>Career</span> Connect
        </div>
        <nav className="employer_register-nav">
          <Link to="/">Home</Link>
          <Link to="/candida  tes">Candidates</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/EmployerLogin">
            <button className="employer_register-btn-primary">Log In</button>
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="employer_register-section">
        <div className="employer_register-content">
          {/* Left side: welcome and illustration */}
          <div className="employer_register-text">
            <h1>
              Welcome Back, to <br></br>
              <span className="employerregister_logomain">Career Connect</span>
            </h1>
            <p>
              Post jobs, review applications, and schedule interviews —{" "}
              <span className="employerregister_span-plogo">
                all in one place
              </span>
            </p>
            <div className="employer_register-illustration">
              <img src={EmployerRegistrationImage} alt="Welcome" />
            </div>
          </div>

          {/* Right side: Registration form */}
          <div className="employer_register-form">
            <form onSubmit={handleSubmit}>
              <h3>Register</h3>
              <p>Please enter your details</p>

              <label>Full Name</label>
              <div className="employer_register-input-container">
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
              <div className="employer_register-input-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Mobile Number</label>
              <div className="employer_register-input-container">
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
              <div className="employer_register-input-container">
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
              <div className="employer_register-input-container">
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
              <div className="employer_register-checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms">
                  I agree with all{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button className="employer_register-btn-submit" type="submit">
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
            <div className="employer_register-option">
              <p>
                Already have an account? <a href="/EmployerLogin">Log In</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
