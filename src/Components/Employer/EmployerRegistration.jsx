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
import EEmailVerificationPopup from "./EmailVerification.jsx";
import { baseURL } from "../../axiosInstance"; // Import your axios instance

const Registration = () => {
  //const url = "http://localhost:9191";
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  // New state to hold validation error messages
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
    // New state to hold verification popup and verified
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  //validation function
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!phoneRegex.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Invalid mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the Terms and Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error on field change
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };
  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

  try {
   const response = await axios.post(`${baseURL}/api/recruiters/register`, formData);

  const recruiterId = response.data.recruiterId;
  localStorage.setItem("recruiterId", recruiterId);
  console.log("Recruiter ID:", recruiterId);
  console.log("Response:", response.data);

  alert(response.data.message || "📨 OTP sent to your email.");
  setShowVerificationPopup(true);
} catch (error) {
  const message = error.response?.data?.message || error.message;

  // Check if it’s "already registered but not verified" from status 200
  if (error.response?.status === 200 && message.includes("not verified")) {
    const recruiterId = error.response.data.recruiterId;
    localStorage.setItem("recruiterId", recruiterId);
    alert(message); // "Email already registered but not verified. OTP re-sent."
    setShowVerificationPopup(true);
    return;
  }

  if (message.includes("already registered")) {
    alert("⚠️ This email is already registered. Please log in instead.");
    navigate("/Employer");
  } else {
    alert("❌ Error: " + message);
  }
}

};
//handle otp verificatiion function
  const handleOtpVerified = () => {
    setShowVerificationPopup(false);
    setIsVerified(true);
    alert("✅ Email Verified Successfully!");
    navigate("/Employer-Create-Profile");
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
          <Link to="/Candidates">Candidates</Link>
          <Link to="/Companies">Companies</Link>
          <Link to="/Employer">
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
              Welcome Back, to <br />
              <span className="employerregister_logomain">Career Connect</span>
            </h1>
            <p>
              Post jobs, review applications, and schedule interviews —{" "}
              <span className="employerregister_span-plogo">all in one place</span>
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

              {/* Full Name */}
              <label>Company Name</label>
              <div className="employer_register-input-container">
                <SvgIcon component={PersonIcon} />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your Company name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              {errors.companyName && <span className="error-text">{errors.companyName}</span>}

              {/* Email */}
              <br></br>
              <label>Email Id</label>
              <div className="employer_register-input-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}

              {/* Mobile Number */}
              <br></br>
              <label>Mobile Number</label>
              <div className="employer_register-input-container">
                <SvgIcon component={PhoneIcon} />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}

              {/* Password */}
              <br></br>
              <label>Create Password</label>
              <div className="employer_register-input-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}

              {/* Confirm Password */}
              <br></br>
              <label>Confirm Password</label>
              <div className="employer_register-input-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

              {/* Terms & Conditions */}
              <div className="employer_register-checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (errors.agreed) {
                      setErrors((prev) => ({ ...prev, agreed: "" }));
                    }
                  }}
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
              {errors.agreed && <span className="error-text">{errors.agreed}</span>}

              <button className="employer_register-btn-submit" type="submit">
                Register
              </button>
            </form>

            {showVerificationPopup && (
              <div className="popup-backdrop">
                <EEmailVerificationPopup
                  email={formData.email}
                  onVerify={handleOtpVerified}
                />
              </div>
            )}

            {isVerified && <p style={{ color: "green" }}>Email Verified Successfully!</p>}
            {/*login option */}
            <div className="employer_register-option">
              <p>
                Already have an account? <Link to="/Employer">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
