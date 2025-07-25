// Reset Password
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
import "../../Styles/Admin/AdminResetPassword.css" 
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/material/SvgIcon";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
 
const AdminResetPassword = () => {
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
 
    setErrors({});
    console.log("Password reset successful:", formData);
    alert("reset password successfully!!")
    // Redirect after success
    navigate("/Admin");
  };
 
  return (
    <div className="AdminResetPassword-container">
      {/* Header */}
      <header className="AdminResetPassword-header">
        <div className="AdminResetPassword-logo">
          <span>Career</span> Connect
        </div>
        <nav className="AdminResetPassword-nav-links">
          <Link to="/">Home</Link>
          <Link to="/Jobs">Jobs</Link>
          <Link to="/Companies">Companies</Link>
          
        </nav>
      </header>
 
      {/* Main Section */}
      <main className="AdminResetPassword-section">
        <form className="AdminResetPassword-content" onSubmit={handleSubmit}>
          <h1>Reset Your Password</h1>
          <p>Enter your email and create a new password here.</p>
 
          {/* Email */}
          <label>Email Id</label>
          <div className="AdminResetPassword-input-container">
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
            <p className="AdminResetPassword-error-text">{errors.email}</p>
          )}
 
          {/* New Password */}
          <label>Create new password</label>
          <div className="AdminResetPassword-input-container">
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
              className="AdminResetPassword--toggle-icon"
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="AdminResetPassword-error-text">{errors.password}</p>
          )}
 
          {/* Confirm Password */}
          <label>Re-enter new password</label>
          <div className="AdminResetPassword-input-container">
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
              className="AdminResetPassword--toggle-icon"
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="AdminResetPassword-error-text">
              {errors.confirmPassword}
            </p>
          )}
 
          {/* Submit Button */}
          <button className="AdminResetPassword-btn-submit" type="submit">
            Reset Password
          </button>
 
          <p className="AdminResetPassword-span-link">
          Back to <Link to="/Admin" style={{textDecoration: "none"}}><span>Log In</span></Link>
        </p>
        </form>
      </main>
    </div>
  );
};
 
export default AdminResetPassword;