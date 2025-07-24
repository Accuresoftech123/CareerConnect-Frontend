import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";

import "../../Styles/JobSeeker/Registerstyle.css";
import JSRegister from "../../Images/JSRegister.svg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import { baseURL } from "../../axiosInstance"; // Import your axios instance

import JEmailVerificationPopup from "./EmailVerification.jsx";

const Registration = () => {
  const navigate = useNavigate();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  // const url = "http://localhost:9191";
  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  // New state to hold validation error messages
  const [errors, setErrors] = useState({});
  // Function to validate form data
  const validate = (data) => {
    const newErrors = {};

    // Full Name - required and min 3 chars
    if (!data.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (data.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(data.fullName.trim())) {
          newErrors.fullName =
            "Full Name must contain only letters and spaces.";
        }

    // Email - required and valid email format
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email.trim())
    ) {
      newErrors.email = "Email is invalid";
    }

    // Mobile Number - required and 10 digits only
   if (!data.mobileNumber.trim()) {
  newErrors.mobileNumber = "Mobile Number is required";
} else if (!/^\+?[1-9]\d{7,14}$/.test(data.mobileNumber.trim())) {
  newErrors.mobileNumber = "Enter a valid phone number with country code";
}

    // Password - required and min 6 chars
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password - must match password
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };
  // Handle input changes
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on the fly when user changes input
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      const validationErrors = validate({ ...formData, [name]: value });
      if (validationErrors[name]) {
        updatedErrors[name] = validationErrors[name];
      } else {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Don't submit if there are errors
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/jobseekers/register`,
        formData
      );

      const { message, jobSeekerId } = response.data;

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("jobSeekerId", jobSeekerId);
        alert(message);
        setShowVerificationPopup(true);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      const res = error.response;
      const msg = res?.data?.message || error.message;

      if (res?.status === 200 && msg.includes("not verified")) {
        const jobSeekerId = res.data.jobSeekerId;
        localStorage.setItem("jobSeekerId", jobSeekerId);
        alert(msg);
        setShowVerificationPopup(true);
      } else if (res?.status === 409) {
        alert(
          "⚠️ This email is already registered and verified. Please log in."
        );
        navigate("/Jobseeker");
      } else {
        alert("❌ Error: " + msg);
      }

      setShowVerificationPopup(false);
    }
  };
  // Function to handle OTP verification
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
          <Link to="/">Home</Link>
          <Link to="/Jobs">Jobs</Link>
          <Link to="/Companies">Companies</Link>
          <Link to="/Jobseeker">
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
              Welcome Back, to <br />
              <span>Career Connect</span>
            </h1>
            <p>Your gateway to professional opportunities</p>
            <div className="jobseeker_register-illustration">
              <img src={JSRegister} alt="Welcome" />
            </div>
          </div>

          {/* Right side: Registration form */}
          <div className="jobseeker_register-form">
            <form onSubmit={handleSubmit} noValidate>
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
              {errors.fullName && (
                <p className="error-text">{errors.fullName}</p>
              )}
              {/* Email - required and valid email format */}
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
              {errors.email && <p className="error-text">{errors.email}</p>}
              {/* Mobile Number - required and 10 digits only */}
              <label>Mobile Number</label>
<div className="jobseeker_register-input-container">
  <PhoneInput
  style={{
   width: "100%",
  padding: "0px",
  paddingLeft: "0px",
  paddingRight: "0px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f3f3f3",
  fontsize: "14px",
  }}
    country={'in'} // Set default country (e.g., 'in' for India)
    value={formData.mobileNumber}
    onChange={(phone) => setFormData({ ...formData, mobileNumber: phone })}
    inputProps={{
      name: 'mobileNumber',
      required: true,
    }}
  />
</div>
              {errors.mobileNumber && (
                <p className="error-text">{errors.mobileNumber}</p>
              )}
              {/* Password - required and min 6 chars */}
              <label>Create Password</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={LockIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="toggle-password-icon"
                  style={{ cursor: "pointer", marginLeft: "auto" }}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
              </div>
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
              {/* Confirm Password - must match password */}
              <label>Confirm Password</label>
              <div className="jobseeker_register-input-container">
                <SvgIcon component={LockIcon} />
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowconfirmPassword((prev) => !prev)}
                  className="toggle-password-icon"
                  style={{ cursor: "pointer", marginLeft: "auto" }}
                >
                  {showconfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
              {/* Submit Button */}
              <button className="jobseeker_register-btn-submit" type="submit">
                Register
              </button>
            </form>
            {/* Conditional rendering for email verification popup */}
            {showVerificationPopup && (
              <div className="popup-backdrop">
                <JEmailVerificationPopup
                  email={formData.email}
                  onVerify={handleOtpVerified}
                />
              </div>
            )}
            {/* Display success message if email is verified */}
            {isVerified && (
              <p style={{ color: "green" }}>Email Verified Successfully!</p>
            )}
            {/* Link to login page */}
            <div className="jobseeker_register-option">
              <p>
                Already have an account? <a href="/Jobseeker">Log In</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
