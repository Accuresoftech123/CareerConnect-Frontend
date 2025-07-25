import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../Styles/Admin/AdminLogin.css";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import { baseURL } from "../../axiosInstance";

const AdminLogin = () => {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/admin/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        alert("✅ Login success");
        navigate("/AdminHome");
      }
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="AdminLogin_page-container">
      <nav className="Admin_header">
        <div className="Admin_logo">
          <span>Career</span> Connect
        </div>
        <div className="Admin_nav-links">
          <Link to="/" className="Admin_nav-link">
            Home
          </Link>
          <Link to="/Jobs" className="Admin_nav-link">
            Jobs
          </Link>
          <Link to="/Candidates" className="Admin_nav-link">
            Candidates
          </Link>
          <Link to="/Companies" className="Admin_nav-link">
            Companies
          </Link>
          <Link to="/Jobseeker">
            <button className="Admin_btn-outline">Job Seeker</button>
          </Link>
          <Link to="/Employer">
            <button className="Admin_btn-primary">Employer</button>
          </Link>
        </div>
      </nav>

      <div className="AdminLogin_login-fillUp">
        <div className="AdminLogin-loginBox">
          <h3 className="AdminLogin_welcome-text">
            Welcome Back,<span> Admin</span>
          </h3>
          <p>Log In to manage platform activity and user operations.</p>

          {/* Email */}
          <div className="form-group">
            <label className="AdminLogin_label" htmlFor="email">
              Email Id
            </label>
            <div className="AdminLogin_Logininput-container">
              <LocalPostOfficeIcon />
              <input
                type="email"
                id="email"
                placeholder="Enter email id"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
            </div>
            {errors.email && (
              <p className="AdminLogin-error-text">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="AdminLogin_label" htmlFor="password">
              Password
            </label>
            <Link to="/Admin-ForgotPassword" className="AdminLogin_forgot">
              Forgot password?
            </Link>
            <div className="AdminLogin_Logininput-container">
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="AdminLogin_password-toggle-icon"
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="AdminLogin-error-text">{errors.password}</p>
            )}
          </div>

          {/* General Server Error */}
          {serverError && (
            <div className="AdminLogin-server-error">{serverError}</div>
          )}
          {/* Remember checkbox */}
          <div className="form-group-checkbox">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Password</label>
          </div>

          <button
            className="AdminLogin_loginbtn-primary"
            onClick={handleSubmit}
            type="submit"
          >
            Log in
          </button>

          <p className="AdminLogin_help-text">
            Need help? <span>Contact your administrator</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
