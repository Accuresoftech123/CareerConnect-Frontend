import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../Styles/JobSeeker/Registerstyle.css";
import JSRegister from "../../Images/JSRegister.svg";

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

  // New state to hold validation error messages
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};

    // Full Name - required and min 3 chars
    if (!data.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (data.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";
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
    } else if (!/^\d{10}$/.test(data.mobileNumber.trim())) {
      newErrors.mobileNumber = "Mobile Number must be 10 digits";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Don't submit if there are errors
      return;
    }

    try {
      const response = await axios.post(`${url}/api/jobseekers/register`, formData);

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
        alert("⚠️ This email is already registered and verified. Please log in.");
        navigate("/Login");
      } else {
        alert("❌ Error: " + msg);
      }

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
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
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
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}

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
              {errors.mobileNumber && <p className="error-text">{errors.mobileNumber}</p>}

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
              {errors.password && <p className="error-text">{errors.password}</p>}

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
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

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
