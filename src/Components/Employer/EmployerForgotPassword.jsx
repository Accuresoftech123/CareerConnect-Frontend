// Forgot Password
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Employer/EmployerForgotPassword.css"
 
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
 
const EmployerForgotPassword = () => {
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
    } else {
      setErrors({});
      // TODO: API call to send OTP
      console.log("OTP sent to:", email);
    }
  };
 
  // Handle OTP verification
 const verifyOtp = async () => {
  if (otp.length !== 6) {
    setError("Please enter a valid 6-digit OTP.");
    return;
  }
 
  // TODO: Add actual OTP verification API call here
  console.log("Verifying OTP:", otp);
 
  // If OTP is correct, navigate to Reset Password page
  navigate("/Employer-ResetPassword");
};
 
  return (
    <div className="EmpForgotPassword_container">
      {/* Header */}
      <header className="EmpForgotPassword-header">
        <div className="EmpForgotPassword_logo">
          <span>Career</span> Connect
        </div>
        <nav className="EmpForgotPassword_nav-links">
          <Link to="/">Home</Link>
          <Link to="/Jobs">Jobs</Link>
          <Link to="/Companies">Companies</Link>
          <Link to="/Employer-Registration">
            <button className="EmpForgotPassword_btn-primary">Register</button>
          </Link>
        </nav>
      </header>
 
      {/* Main Section */}
      <main className="EmpForgotPassword-section">
        <div className="EmpForgotPassword-content">
        <h1>Forgot Password</h1>
        <p>Please enter your registered email to receive the OTP.</p>
 
        {/* Email Field */}
        <div>
          <label>Email Id</label>
          <div className="EmpForgotPassword-input-container">
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
          {errors.email && <p className="EmpForgotPassword-error-text">{errors.email}</p>}
        </div>
 
        <p>
          You'll receive a password reset link or OTP via email. If you don't see it, check your spam folder.
        </p>
 
        <button
          className="EmpForgotPassword-GetOtp_btn-primary"
          onClick={handleSubmit}
          type="submit"
        >
          Get OTP
        </button>
 
        {otpSent && (
  <p className="EmpForgotPassword-span-link">
    We've sent an OTP to {email}{" "}
    <span style={{ color: "blue", cursor: "pointer" }} onClick={handleSubmit}>
      Resend OTP
    </span>
  </p>
)}
 
        {/* OTP Input */}
        <label>Verification Code</label>
        <div className="EmpForgotPassword-input-container">
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
            className={`Empemail-verification-otp-input ${error ? "input-error" : ""}`}
            placeholder="Enter OTP"
          />
          {error && <p style={{color:"red"}}>{error}</p>}
        </div>
 
        {/* Verify Button */}
        <button
          onClick={verifyOtp}
          className="EmpForgotPassword-email-verification-verify-button"
          disabled={otp.length !== 6}
        >
          Verify
        </button>
 
        <p className="EmpForgotPassword-span-link">
          Back to <Link to="/Employer" style={{textDecoration: "none"}}><span>Log In</span></Link>
        </p>
        </div>
      </main>
    </div>
  );
};
 
export default EmployerForgotPassword;