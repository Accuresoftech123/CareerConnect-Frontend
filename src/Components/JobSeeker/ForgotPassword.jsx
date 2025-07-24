// Forgot Password
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
import "../../Styles/JobSeeker/ForgotPassword.css";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import { baseURL } from "../../axiosInstance";
import axios from "axios";
const ForgotPassword = () => {
  const navigate = useNavigate();
 const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // Now a single string input
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(""); // For OTP-related error
 
  // Email Validation
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };
 
  // Handle "Get OTP" submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setOtpSent(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } 
    
    axios.post(`${baseURL}/api/jobseekers/Send-Otp/${email}`)
    .then((res) => {
      alert("OTP sent to your email");
      console.log(res.data);
      setOtpSent(true);
    })
    .catch((err) => {
      alert("Error sending OTP: " + (err.response?.data || err.message));
    });
  };
 
  // Handle OTP verification
 const verifyOtp = async () => {
  if (otp.length !== 6) {
    setError("Please enter a valid 6-digit OTP.");
    return;
  }
 
  // TODO: Add actual OTP verification API call here
  try {
    const response = await axios.post(`${baseURL}/api/jobseekers/verify-otp`, {
      email,
      otp,
    });

    if (response.data.success) {
      alert("OTP Verified");
      console.log(response.data.message);
      navigate("/Reset-Password");
    } else {
      setError(response.data.message || "OTP verification failed.");
    }
  } catch (err) {
    console.error("OTP Verification Failed:", err);
    setError(err.response?.data?.message || "Server error during OTP verification.");
  }
};
 
  return (
    <div className="ForgotPassword_container">
      {/* Header */}
      <header className="ForgotPassword-header">
        <div className="ForgotPassword_logo">
          <span>Career</span> Connect
        </div>
        <nav className="ForgotPassword_nav-links">
          <Link to="/">Home</Link>
          <Link to="/Jobs">Jobs</Link>
          <Link to="/Companies">Companies</Link>
          <Link to="/JobSeeker-Registration">
            <button className="ForgotPassword_btn-primary">Register</button>
          </Link>
        </nav>
      </header>
 
      {/* Main Section */}
      <main className="ForgotPassword-section">
        <div className="ForgotPassword-content">
        <h1>Reset Password</h1>
        <p>Please enter your details</p>
 
        {/* Email Field */}
        <div>
          <label>Email Id</label>
          <div className="ForgotPassword-input-container">
            <SvgIcon component={LocalPostOfficeIcon} />
            <input
              type="email"
              placeholder="Enter email id"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
              required
            />
          </div>
          {errors.email && <p className="ForgotPassword-error-text">{errors.email}</p>}
        </div>
 
        <p>
          You'll receive a password reset link or OTP via email. If you don't see it, check your spam folder.
        </p>
 
        <button
          className="ForgotPassword-GetOtp_btn-primary"
          onClick={handleSubmit}
          type="submit"
        >
          Get OTP
        </button>
 
        {otpSent && (
  <p className="ForgotPassword-span-link">
    We've sent an OTP to {email}{" "}
    <span style={{ color: "blue", cursor: "pointer" }} onClick={handleSubmit}>
      Resend OTP
    </span>
  </p>
)}
 
        {/* OTP Input */}
        <label>Verification Code</label>
        <div className="ForgotPassword-input-container">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="6"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
              setError("");
            }}
            className={`email-verification-otp-input ${error ? "input-error" : ""}`}
            placeholder="Enter OTP"
          />
          {error && <p style={{color:"red"}}>{error}</p>}
        </div>
 
        {/* Verify Button */}
        <button
          onClick={verifyOtp}
          className="ForgotPassword-email-verification-verify-button"
          disabled={otp.length !== 6}
        >
          Verify
        </button>
 
        <p className="ForgotPassword-span-link">
          Back to <Link to="/JobSeeker" style={{textDecoration: "none"}}><span>Log In</span></Link>
        </p>
        </div>
      </main>
    </div>
  );
};
 
export default ForgotPassword;