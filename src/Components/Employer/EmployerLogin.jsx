import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import linkedin from "../../Images/linkedin.svg";
import google_g from "../../Images/google_g.jpg";
import employerLogin from "../../Images/employerLogin.svg";

import axios from "axios";

import "../../Styles/Employer/EmployerLoginstyle.css";

const EmployerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = "http://localhost:9191";
  const navigate = useNavigate();

  //Validation format part
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //handle submit part
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const user = { email, password };

    try {
      const response = await axios.post(`${url}/api/recruiters/login`, user);
      const recruiter = response.data;

      if (recruiter) {
        alert("Login Successful");
        localStorage.setItem("recruiterId", recruiter.id);
        localStorage.setItem("token", recruiter.token);
        navigate("/EmployerDashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      const errorMsg =
        error.response?.data?.message || "Login failed. Please check your credentials.";
      alert("Error: " + errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="employer_loginpage-container">
      {/* Header */}
      <header className="employer_Login-header">
        <div className="employer_logo">
          <span>Career</span> Connect
        </div>

        <nav className="employer_loginnav-links">
          <Link to="/">Home</Link>
          <Link to="/candidates">Candidates</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/EmployerRegistration">
            <button className="employer_btn-primary">Register</button>
          </Link>
        </nav>
      </header>

      {/* Main Login Section */}
      <main className="employer_login-section">
        <div className="employer_login-content">
          {/* Left Section */}
          <section className="employer_login-text col-6">
            <h1>
              Welcome Back, to <br />
              <span className="employerlogin_logomain">Career Connect</span>
            </h1>
            <p>
              Post jobs, review applications, and schedule interviews —{" "}
              <span className="employerlogin_span-plogo">all in one place</span>
            </p>
            <div className="employer_illustration">
              <img src={employerLogin} alt="Welcome Illustration" />
            </div>
          </section>

          {/* Right Section */}
          <section className="employer_login-fillUp col-6">
            <h3>Login</h3>
            <p>Please enter your details</p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Input */}
              <label className="m-1 row" htmlFor="email">
                Email Id:
              </label>
              <div className="employer_Logininput-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  id="email"
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
              {errors.email && <span className="error-text">{errors.email}</span>}

              {/* Password Input */}
              <label className="m-1 row" htmlFor="password">
                Password:
              </label>
              <div className="employer_Logininput-container">
                <SvgIcon component={LockIcon} />
                <input
                  id="password"
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
              {errors.password && <span className="error-text">{errors.password}</span>}

              {/* Forgot Password */}
              <p className="employer_forgotpass">
                <a href="forgot_password">Forgot Password?</a>
              </p>

              {/* Submit */}
              <button
                className="employer_loginbtn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Social Logins */}
            <div className="employer_optionlogin">or continue with</div>
            <div>
              <button className="employer_loginbtn-outline" type="button">
                <img src={google_g} alt="Google" />
                Google
              </button>
              <button className="employer_loginbtn-outline" type="button">
                <img src={linkedin} alt="LinkedIn" />
                Continue with LinkedIn
              </button>
            </div>

            {/* Register */}
            <div className="employer_optionlogin">
              <p>
                Don't have an account? <a href="employerregistration">Register</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EmployerLogin;
