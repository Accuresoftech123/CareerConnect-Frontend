import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import linkedin from "../../Images/linkedin.svg";
import google_g from "../../Images/google_g.jpg";
import employerLogin from "../../Images/employerLogin.svg";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from "axios";

import "../../Styles/Employer/EmployerLoginstyle.css";
import { baseURL } from "../../axiosInstance"; // Import your axios instance

const EmployerLogin = () => {
  // State to hold input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  // const url = "http://localhost:9191";
  //state for errors
  const [errors, setErrors] = useState({});
  // React Router navigation hook
  const navigate = useNavigate();

  // Navigate to Registration page
  const goToRegistration = () => {
    navigate("/Employer-Registration");
  };
  //validation part function
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // ✅ Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
     e.preventDefault();
    // navigate("/EmployerDashboard");
    const isValid = validate();
  console.log("Validation passed?", isValid);
  if (!isValid) return;

    // TODO: Implement actual login logic here (e.g., API call)

    const user = { email, password };

    try {
      const response = await axios.post(
        `${baseURL}/api/recruiters/login`,
        user
      );
      const recruiter = response.data;

      if (response.data) {
        alert("Login Successful");

        console.log(response.data);

        localStorage.setItem("recruiterId", recruiter.id);
        console.log("Recruiter ID:", recruiter.id);

        // set token
        const token = response.data.token;
        localStorage.setItem("token", token);

        navigate("/EmployerHome"); // Navigate after successful login
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      alert("Error: " + errorMsg);
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
          <Link to="/Candidates">Candidates</Link>
          <Link to="/Companies">Companies</Link>
          <Link to="/Employer-Registration">
            <button className="employer_btn-primary">Register</button>
          </Link>
        </nav>
      </header>

      {/* Main Login Section */}
      <main className="employer_login-section">
        <div className="employer_login-content">
          {/* Left side: Welcome text and illustration */}
          <section className="employer_login-text col-6">
            <h1>
              Welcome Back, to <br></br>
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

          {/* Right side: Login form */}
          <section className="employer_login-fillUp col-6">
            <h3>Login</h3>
            <p>Please enter your details</p>

            <form onSubmit={handleSubmit}>
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
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
              {/* Password Input */}
              <label className="m-1 row" htmlFor="password">
                Password:
              </label>
              <div className="employer_Logininput-container">
                <SvgIcon component={LockIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="jsl-toggle-password-icon"
                  style={{ cursor: "pointer", marginLeft: "auto" }}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </span>
              </div>
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
              {/* Forgot password link */}
              <p className="employer_forgotpass">
                <Link to="/Employer-ForgotPassword">Forgot Password</Link>
              </p>

              {/* Login Button */}
              <button className="employer_loginbtn-primary" type="submit">
                Log in
              </button>
            </form>

            {/* Alternative login options */}
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

            {/* Registration link */}
            <div className="employer_optionlogin">
              <p>
                Don't have an account?{" "}
                <Link to="/Employer-Registration">Register</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EmployerLogin;
