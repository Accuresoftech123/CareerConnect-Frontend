import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import linkedin from "../../Images/linkedin.svg";
import google_g from "../../Images/google_g.jpg";
import employerLogin from "../../Images/employerLogin.svg";
import "../../Styles/Employer/EmployerLoginstyle.css";

const EmployerLogin = () => {
  // State to hold input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();

  // Navigate to Registration page
  const goToRegistration = () => {
    navigate("/EmployerRegistration");
  };

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/EmployerDashboard");
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // TODO: Implement actual login logic here (e.g., API call)

    // Temporary navigation after "login"
    
  };

  return (
    <div className="employer_loginpage-container">
      {/* Header */}
      <header className="employer_Login-header">
        <div className="employer_logo">
          <span>Career</span> Connect
        </div>

        <nav className="employer_loginnav-links">
          <Link to="/" >
                      Home
                    </Link>
                    <Link to="/candidates" >
                      Candidates
                    </Link>
                    <Link to="/companies" >
                      Companies
                    </Link>
                    <Link to="/EmployerRegistration">
          <button className="employer_btn-primary">
            Register
          </button>
          </Link>
        </nav>
      </header>

      {/* Main Login Section */}
      <main className="employer_login-section">
        <div className="employer_login-content">
          {/* Left side: Welcome text and illustration */}
          <section className="employer_login-text col-6">
            <h1>
              Welcome Back, to <br></br><span className="employerlogin_logomain">Career Connect</span>
            </h1>
            <p>
              Post jobs, review applications, and schedule interviews —  <span className="employerlogin_span-plogo">all in one place</span>
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
                <SvgIcon component={LocalPostOfficeIcon}/>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot password link */}
              <p className="employer_forgotpass">
                <a href="forgot_password">Forgot Password?</a>
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
                <a href="employerregistration">Register</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EmployerLogin;
