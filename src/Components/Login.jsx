import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Helper/ActionsAsync";
import { useNavigate } from "react-router-dom";
import "../Styles/Loginstyle.css";
import linkedin from "../Images/linkedin.svg";
import google_g from "../Images/google_g.jpg";
import login from "../Images/login.svg";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import axios from "axios";

// import { Link } from "react-router-dom";


const Login = () => {
  const url= "http://localhost:9191/jobseekers";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const UserRegistration = (e) => {
    navigate("/Registration");
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
    axios.post(`${url}/login`, user)
      .then((response) => {
        if (response.data) {
          alert("Login Successful");
          console.log("Login Successful:", response.data);
          navigate("/");
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
    <div className="loginpage-container">
      {/*Header */}
      <header className="Login-header">
        <div className="logo">
          <span>Career</span> Connect
        </div>
        <nav className="loginnav-links">
          <a href="jobs">Jobs</a>
          <a href="companies">Companies</a>
          <button className="btn-primary" onClick={UserRegistration}>
            Register
          </button>
        </nav>
      </header>
      {/*Main Section */}
      <main className="login-section">
        <div className="login-content">
          <div className="login-text col-6">
            <h1>
              Welcome Back, to <span> Career Connect</span>
            </h1>
            <p>Your gateway to professional opportunities</p>
            <div className="illustration">
              <img src={login} alt="welcome Illustration" />
            </div>
          </div>
          {/*Form section */}
          <div className="login-fillUp col-6">
            <div>
              <h3>Log In</h3>
              <p>Please enter your details</p>
              <div>
                <label className="m-1 row">Email Id : </label>
                <div className="Logininput-container">
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
                <div className="Logininput-container">
                  <SvgIcon component={LockIcon} />
                  <input
                    type="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password  "
                    required
                  ></input>
                </div>
                <p className="forgotpass">
                  <a href="forgot_password"> Forgot Password?</a>
                </p>
              </div>
              <div>
                <div>
                  <button
                    className="loginbtn-primary"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Log in
                  </button>
                  
                </div>
                <div className="optionlogin">or continue with</div>
                <div>
                  <button className="loginbtn-outline">
                    <img src={google_g} alt="Google" />
                    Google
                  </button>
                  <button className="loginbtn-outline">
                    <img src={linkedin} alt="LinkedIn" />
                    Continue with LinkedIn
                  </button>
                </div>
                <div className="optionlogin">
                  <p>
                    Don't have an account?<a href="registration"> Register</a>
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

export default Login;
