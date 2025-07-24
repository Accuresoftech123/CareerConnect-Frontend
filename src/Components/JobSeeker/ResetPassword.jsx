// Reset Password
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
import "../../Styles/JobSeeker/ResetPassword.css";
 
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/material/SvgIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { baseURL } from "../../axiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
 
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
 
  // Toggle input fields
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
 
  const validate = () => {
    const newErrors = {};
    const { email, password, confirmPassword } = formData;
 
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = "Invalid email format";
    }
 
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
 
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
 
    return newErrors;
  };
 
 const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  axios.put(`${baseURL}/api/jobseekers/Set-password/${formData.email}/${formData.password}`)
    .then((response) => {
      alert(response.data.message); // ✅ use correct key "message"
      console.log("Password reset successful:", formData);
     // navigate("/JobSeeker");
    })
    .catch((err) => {
      console.error("Reset password failed:", err);
      alert(err.response?.data?.message || "Password reset failed.");
    });

  setErrors({});
};
 
  return (
    <div className="ResetPassword-container">
      {/* Header */}
      <header className="ResetPassword-header">
        <div className="ResetPassword-logo">
          <span>Career</span> Connect
        </div>
        <nav className="ResetPassword-nav-links">
          <Link to="/">Home</Link>
          <Link to="/Jobs">Jobs</Link>
          <Link to="/Companies">Companies</Link>
          <Link to="/JobSeeker-Registration">
            <button className="ResetPassword-btn-primary">Register</button>
          </Link>
        </nav>
      </header>
 
      {/* Main Section */}
      <main className="ResetPassword-section">
        <form className="ResetPassword-content" onSubmit={handleSubmit}>
          <h1>Reset Your Password</h1>
          <p>Please enter your details</p>
 
          {/* Email */}
          <label>Email Id</label>
          <div className="ResetPassword-input-container">
            <SvgIcon component={LocalPostOfficeIcon} />
            <input
              type="email"
              name="email"
              placeholder="Enter email id"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p className="ResetPassword-error-text">{errors.email}</p>
          )}
 
          {/* New Password */}
          <label>Create new password</label>
          <div className="ResetPassword-input-container">
            <SvgIcon component={LockIcon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              onClick={togglePasswordVisibility}
              className="ResetPassword--toggle-icon"
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="ResetPassword-error-text">{errors.password}</p>
          )}
 
          {/* Confirm Password */}
          <label>Re-enter new password</label>
          <div className="ResetPassword-input-container">
            <SvgIcon component={LockIcon} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="ResetPassword--toggle-icon"
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="ResetPassword-error-text">
              {errors.confirmPassword}
            </p>
          )}
 
          {/* Submit Button */}
          <button className="ResetPassword-btn-submit" type="submit">
            Reset Password
          </button>
 
          <p className="ResetPassword-span-link">
          Back to <Link to="/JobSeeker" style={{textDecoration: "none"}}><span>Log In</span></Link>
        </p>
        </form>
      </main>
    </div>
  );
};
 
export default ResetPassword;