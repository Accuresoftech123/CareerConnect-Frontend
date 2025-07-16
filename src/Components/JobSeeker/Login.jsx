import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/JobSeeker/Loginstyle.css";
import linkedin from "../../Images/linkedin.svg";
import JSLogin from "../../Images/JSLogin.svg";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const url = "http://localhost:9191";
  const navigate = useNavigate();
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation errors state
  const [errors, setErrors] = useState({});
  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = { email, password };

    axios
      .post(`${url}/api/jobseekers/login`, user)
      .then((response) => {
        if (response.data) {
          alert("Login Successful");
          console.log(response.data);
          localStorage.setItem("jobSeekerId", response.data.id);
          localStorage.setItem("token", response.data.token);
          navigate("/JobSeekerHome");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Login Failed:", error);
        alert("Login Failed: " + (error.response?.data || error.message));
      });
  };
// Handle Google login error
const handleGoogleError = () => {
    console.error("Google login failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="jobseeker_loginpage-container">
      {/* Header */}
      <header className="jobseeker_Login-header">
        <div className="jobseeker_logo">
          <span>Career</span> Connect
        </div>
        <nav className="jobseeker_loginnav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/Registration">
            <button className="jobseeker_btn-primary">Register</button>
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="jobseeker_login-section">
        <div className="jobseeker_login-content">
          {/* Left: Welcome Message + Illustration */}
          <div className="jobseeker_login-text">
            <h1>
              Welcome Back, to <br />
              <span>Career Connect</span>
            </h1>
            <p>Your gateway to professional opportunities</p>
            <div className="jobseeker_illustration">
              <img src={JSLogin} alt="Welcome Illustration" />
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="jobseeker_login-fillUp">
            <h3>Log In</h3>
            <p>Please enter your details</p>

            {/* Email Field */}
            <div>
              <label>Email Id:</label>
              <div className="jobseeker_Logininput-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="email"
                  placeholder="Enter email"
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
              {errors.email && (
                <p className="error-text">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label>Password:</label>
              <div className="jobseeker_Logininput-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  required
                />
              </div>
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
              <p className="jobseeker_forgotpass">
                <a href="/forgot_password">Forgot Password?</a>
              </p>
            </div>

            {/* Submit */}
            <button
              className="jobseeker_loginbtn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Log in
            </button>

            <div className="jobseeker_optionlogin">or continue with</div>

            {/* Google & LinkedIn */}
            <div className="jobseeker_sociallogin-container">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  axios
                    .post(`${url}/auth/google-login`, {
                      token: credentialResponse.credential,
                    })
                    .then((res) => {
                      console.log("Google Login Successful", res.data);
                      localStorage.setItem("jobSeekerId", res.data.id);
                      navigate("/JobSeekerHome");
                    })
                    .catch((err) => {
                      console.error("Google Login Failed", err);
                      alert("Google login failed");
                    });
                }}
                onError={handleGoogleError}
                useOneTap
              />

              <button className="jobseeker_loginbtn-outline">
                <img src={linkedin} alt="LinkedIn" /> Continue with LinkedIn
              </button>
            </div>
            {/* Register Link */}
            <div className="jobseeker_optionlogin">
              <p>
                Don't have an account?{" "}
                <Link to="/Registration">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
