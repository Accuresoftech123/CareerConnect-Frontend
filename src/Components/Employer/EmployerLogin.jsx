import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Helper/ActionsAsync";
import { useNavigate } from "react-router-dom";
import "../../Styles/Employer/EmployerLoginstyle.css";
import linkedin from "../../Images/linkedin.svg";
import google_g from "../../Images/google_g.jpg";
import employerLogin from "../../Images/employerLogin.svg";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import axios from "axios";

// import { Link } from "react-router-dom";


const EmployerLogin = () => {
  const url= "http://localhost:9191/jobseekers";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const UserRegistration = (e) => {
    navigate("/EmployerRegistration");
  };
  // const dispatch = useDispatch();
  // const loginState = useSelector((state) => state.login);
  // const { isAuthenticated, error } = loginState;
  // const isAuthenticated = useSelector(state => state.login.isAuthenticated);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    let user={email,password};
    // axios.post(`${url}/login`, user)
    //   .then((response) => {
    //     if (response.data) {
    //       alert("Login Successful");
    //       console.log("Login Successful:", response.data);
    //       navigate("/");
    //     } else {
    //       alert("Invalid credentials");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Login Failed:", error);
    //     alert("Login Failed: " + (error.response?.data || error.message));
    //   });
    navigate("/employercreateprofile");
  };

  

  return (
    <div className="employer_loginpage-container">
      {/*Header */}
      <header className="employer_Login-header">
        <div className="employer_logo">
          <span>Career</span> Connect
        </div>
        <nav className="employer_loginnav-links">
          <a href="Candidates">Candidates</a>
          <a href="companies">Companies</a>
          <button className="employer_btn-primary" onClick={UserRegistration}>
            Register
          </button>
        </nav>
      </header>
      {/*Main Section */}
      <main className="employer_login-section">
        <div className="employer_login-content">
          <div className="employer_login-text col-6">
            <h1>
              Welcome Back, to <span> Career Connect</span>
            </h1>
            <p>Post jobs,review applications,and schedule interviews-all in one place</p>
            <div className="employer_illustration">
              <img src={employerLogin} alt="welcome Illustration" />
            </div>
          </div>
          {/*Form section */}
          <div className="employer_login-fillUp col-6">
            <div>
              <h3>Employer Login</h3>
              <p>Please enter your details</p>
              <div>
                <label className="m-1 row">Email Id : </label>
                <div className="employer_Logininput-container">
                  <SvgIcon component={LocalPostOfficeIcon} />
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email id"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label className="m-1 row">Password :</label>
                <div className="employer_Logininput-container">
                  <SvgIcon component={LockIcon} />
                  <input
                    type="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password  "
                    required
                  ></input>
                </div>
                <p className="employer_forgotpass">
                  <a href="forgot_password"> Forgot Password?</a>
                </p>
              </div>
              <div>
                <div>
                  <button
                    className="employer_loginbtn-primary"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Log in
                  </button>
                  
                </div>
                <div className="employer_optionlogin">or continue with</div>
                <div>
                  <button className="employer_loginbtn-outline">
                    <img src={google_g} alt="Google" />
                    Google
                  </button>
                  <button className="employer_loginbtn-outline">
                    <img src={linkedin} alt="LinkedIn" />
                    Continue with LinkedIn
                  </button>
                </div>
                <div className="employer_optionlogin">
                  <p>
                    Don't have an account?<a href="employerregistration"> Register</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerLogin;
