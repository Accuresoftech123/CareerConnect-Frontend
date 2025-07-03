import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../../Styles/JobSeeker/Loginstyle.css";

import linkedin from "../../Images/linkedin.svg";
import google_g from "../../Images/google_g.jpg";
import login from "../../Images/login.svg";

import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import axios from "axios";

const Login = () => {
  const url = "http://localhost:9191";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/Registration");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const user = { email, password };
    axios.post(`${url}/jobseekers/login`, user)
      .then((response) => {
        if (response.data) {
          alert("Login Successful");
          console.log("Login Successful:", response.data);
          navigate("/JobSeeker-Create-Profile");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Login Failed:", error);
        alert("Login Failed: " + (error.response?.data || error.message));
      });
  };

  return (
    <div className="jobseeker_loginpage-container">
      {/* Header */}
      <header className="jobseeker_Login-header">
        <div className="jobseeker_logo">
          <span>Career</span> Connect
        </div>
        <nav className="jobseeker_loginnav-links">
          <Link to="/" >
            Home
          </Link>
          <Link to="/jobs" >
            Jobs
          </Link>
          <Link to="/companies" >
            Companies
          </Link>
          <Link to="/Registration">
          <button className="jobseeker_btn-primary" >
            Register
          </button>
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="jobseeker_login-section">
        <div className="jobseeker_login-content">
          {/* Left: Welcome Message + Illustration */}
          <div className="jobseeker_login-text">
            <h1>
              Welcome Back, to <br></br><span>Career Connect</span>
            </h1>
            <p>Your gateway to professional opportunities</p>
            <div className="jobseeker_illustration">
              <img src={login} alt="Welcome Illustration" />
            </div>
          </div>

          {/* Right: Login Form */}
          <div className="jobseeker_login-fillUp">
            <h3>Log In</h3>
            <p>Please enter your details</p>

            <div>
              <label>Email Id:</label>
              <div className="jobseeker_Logininput-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="jobseeker_Logininput-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="jobseeker_forgotpass">
                <a href="forgot_password">Forgot Password?</a>
              </p>
            </div>

            <button
              className="jobseeker_loginbtn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Log in
            </button>

            <div className="jobseeker_optionlogin">or continue with</div>

            <button className="jobseeker_loginbtn-outline">
              <img src={google_g} alt="Google" /> Google
            </button>
            <button className="jobseeker_loginbtn-outline">
              <img src={linkedin} alt="LinkedIn" /> Continue with LinkedIn
            </button>

            <div className="jobseeker_optionlogin">
              <p>
                Don't have an account? <a href="registration">Register</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
