// Admin-Login

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../Styles/Admin/AdminLogin.css";

import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Import for show password
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Import for hide password

import axios from "axios"; // axios is imported but not used in this snippet, keep if used elsewhere

const AdminLogin = () => {
  const navigate = useNavigate();

  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
 const [error, setError] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Use functional update for safety
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 Optional: Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9191/api/admin/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
       alert(" ✅ Login success");
        navigate("/AdminHome");
      }
    } catch (err) {
      // ❌ Login failed
      setError(err.response?.data || "Invalid email or password");
    }
  };

  return (
    <>
      <div className="AdminLogin_page-container">
        {/* Header */}
        <nav className="AdminLogin_header">
          <div className="AdminLogin_logo">
            <span>Career</span> Connect
          </div>
        </nav>

        {/* Login Form */}
        <div className="AdminLogin_login-fillUp">
          <div className="AdminLogin-loginBox">
            <h3 className="AdminLogin_welcome-text">
              {" "}
              Welcome Back,<span>Admin</span>
            </h3>
            <p>Log In to manage platform activity and user operations.</p>

            {/* Email Input */}
            <div className="form-group">
              {" "}
              {/* Added a wrapper for consistent styling */}
              <label className="AdminLogin_label" htmlFor="email">
                Email Id
              </label>
              <div className="AdminLogin_Logininput-container">
                <LocalPostOfficeIcon />{" "}
                {/* Use component directly if SvgIcon is not strictly needed for default Mui icons */}
                <input
                  type="email"
                  id="email" // Added id for label association
                  placeholder="Enter email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div className="form-group">
              {" "}
              {/* Added a wrapper for consistent styling */}
              <label className="AdminLogin_label" htmlFor="password">
                Password
              </label>
              {/* Changed p tag to Link for navigation */}
              <Link to="/AdminForgetPassword" className="AdminLogin_forgot">
                Forgot password?
              </Link>
              <div className="AdminLogin_Logininput-container">
                <LockIcon />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" // Added id for label association
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </div>

            {/* Remember Password Checkbox */}
            <div className="form-group-checkbox">
              {" "}
              {/* Different class for checkbox line */}
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember Password</label>
            </div>

            <button
              className="AdminLogin_loginbtn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Log in
            </button>
            {/* Changed class to className */}
            <p className="AdminLogin_help-text">
              Need help? <span>Contact your administrator</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
